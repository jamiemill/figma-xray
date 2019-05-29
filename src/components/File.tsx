import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Report from "./Report";
import { fetchDocument, FileData, ImageData, fetchImages } from "../api";
import {
  componentSummary,
  ComponentSummary
} from "../analysis/componentSummary";
import {
  findTextNodesWithInlineStyles,
  InlineTextStyleNodes
} from "../analysis/findStyles";
import nextTick from "../nextTick";

type FileProps = {
  fileID: string;
  personalToken: string;
};

type LoadingStatus =
  | "LOADING_DOCUMENT"
  | "LOADING_IMAGES"
  | "ANALYSING"
  | "NONE";

export default function File({ fileID, personalToken }: FileProps) {
  const [fileData, setFileData] = useState<FileData>(null);
  const [summary, setSummary] = useState<ComponentSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingStatus>("NONE");
  const [imageData, setImageData] = useState<ImageData>(null);
  const [
    inlineTextStyleNodes,
    setInlineTextStyleNodes
  ] = useState<InlineTextStyleNodes | null>(null);

  useEffect(() => {
    if (fileData) {
      window.document.title = "X-Ray: " + fileData.name;
    }
    return function() {
      window.document.title = "X-Ray";
    };
  }, [fileData]);

  useEffect(() => {
    const loadEverything = async () => {
      setLoading("LOADING_DOCUMENT");
      setFileData(null);
      setImageData(null);
      setError(null);
      const fileData = await fetchDocument(fileID, personalToken);
      setFileData(fileData);

      if (fileData) {
        setLoading("ANALYSING");
        const summary = await nextTick(() => componentSummary(fileData));
        setSummary(summary);

        const inlineTextStyleNodes = await nextTick(() =>
          findTextNodesWithInlineStyles(fileData)
        );
        setInlineTextStyleNodes(inlineTextStyleNodes);

        const componentIdsForImages = Object.keys(fileData.components);
        const inlineTextStyleNodeIDsForImages = inlineTextStyleNodes.map(
          node => node.node.id
        );
        const idsForImages: Set<string> = new Set([
          ...componentIdsForImages,
          ...inlineTextStyleNodeIDsForImages
        ]);
        if (idsForImages.size) {
          setLoading("LOADING_IMAGES");
          const perPage = 50;
          for (let n = 0; n < idsForImages.size; n += perPage) {
            const images = await fetchImages(
              fileID,
              personalToken,
              Array.from(idsForImages).slice(n, n + perPage)
            );
            setImageData(
              (prev: ImageData): ImageData =>
                prev ? { ...prev, ...images } : images
            );
          }
        }

        setLoading("NONE");
      } else {
        setLoading("NONE");
      }
    };
    loadEverything().catch(e => {
      setLoading("NONE");
      if (e.request) {
        setError(e.message);
      } else {
        throw e;
      }
    });
  }, [fileID, personalToken]);

  return (
    <div>
      <DocumentName>
        {fileData ? (
          <DocumentLink
            target="_blank"
            href={`https://www.figma.com/file/${fileID}`}
          >
            {fileData.name}
          </DocumentLink>
        ) : null}{" "}
        <DocumentNameLabel>
          <LoadingStatus loading={loading} error={error} />
        </DocumentNameLabel>
      </DocumentName>
      {fileData ? (
        <Report
          fileID={fileID}
          fileData={fileData}
          summary={summary}
          imageData={imageData}
          inlineTextStyleNodes={inlineTextStyleNodes}
        />
      ) : null}
    </div>
  );
}

function LoadingStatus({
  loading,
  error
}: {
  loading: LoadingStatus;
  error: string | null;
}) {
  const map = {
    NONE: null,
    LOADING_DOCUMENT: "Loading document...",
    LOADING_IMAGES: "Loading images...",
    ANALYSING: "Analysing document..."
  };
  return <>{error ? error : map[loading]}</>;
}

const DocumentName = styled.h1`
  font-weight: 900;
  margin-bottom: 40px;
`;
const DocumentNameLabel = styled.span`
  font-weight: 300;
  color: #999;
`;
const DocumentLink = styled.a`
  color: inherit;
`;
