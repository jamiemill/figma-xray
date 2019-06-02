import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Report from "./Report";
import { fetchDocument, FileData, ImageData, fetchImages } from "../api";
import { ComponentSummary } from "../analysis/componentSummary";
import { InlineTextStyleNodes } from "../analysis/findStyles";
import { buildIndex, Index } from "../analysis/indexBuilder";

import ComponentSummaryWorker from "../workers/ComponentSummary.worker.ts";
import InlineTextStyleWorker from "../workers/InlineTextStyle.worker.ts";
import ImageManager from "../ImageManager";

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
  const [index, setIndex] = useState<Index | null>(null);
  const [summary, setSummary] = useState<ComponentSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingStatus>("NONE");
  const [imageData, setImageData] = useState<ImageData>(null);
  const [
    inlineTextStyleNodes,
    setInlineTextStyleNodes
  ] = useState<InlineTextStyleNodes | null>(null);
  const [imageManager, setImageManager] = useState<ImageManager>(
    () => new ImageManager({ personalToken, fileID })
  );

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
      console.time("FETCH_DOCUMENT");
      const fileData = await fetchDocument(fileID, personalToken);
      setFileData(fileData);
      console.timeEnd("FETCH_DOCUMENT");

      if (fileData) {
        setLoading("ANALYSING");
        console.time("ANALYSIS");

        console.time("ANALYSIS_BUILD_INDEX");
        const index = buildIndex(fileData);
        setIndex(index);
        console.timeEnd("ANALYSIS_BUILD_INDEX");

        console.time("ANALYSIS_COMPONENT_SUMMARY");
        const componentSummaryWorker = new ComponentSummaryWorker();
        const summary = await promiseWork<ComponentSummary>(
          componentSummaryWorker,
          { fileData, index }
        );
        setSummary(summary);
        componentSummaryWorker.terminate();
        console.timeEnd("ANALYSIS_COMPONENT_SUMMARY");

        console.time("ANALYSIS_INLINE_STYLE");
        const inlineTextStyleWorker = new InlineTextStyleWorker();
        const inlineTextStyleNodes = await promiseWork<InlineTextStyleNodes>(
          inlineTextStyleWorker,
          { fileData, index }
        );
        setInlineTextStyleNodes(inlineTextStyleNodes);
        inlineTextStyleWorker.terminate();
        console.timeEnd("ANALYSIS_INLINE_STYLE");

        console.timeEnd("ANALYSIS");

        /*
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
          console.time("LOADING_IMAGES");
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
          console.timeEnd("LOADING_IMAGES");
        }
        */

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
      {fileData && index ? (
        <Report
          fileID={fileID}
          fileData={fileData}
          summary={summary}
          imageData={imageData}
          inlineTextStyleNodes={inlineTextStyleNodes}
          index={index}
          imageManager={imageManager}
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

function promiseWork<T>(worker: Worker, data: any): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    worker.addEventListener("message", e => {
      resolve(e.data);
    });
    worker.postMessage(data);
  });
}
