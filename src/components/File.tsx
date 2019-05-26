import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Report from "./Report";
import { fetchDocument, FileData, ImageData, fetchImages } from "../api";
import {
  componentSummary,
  ComponentSummary
} from "../analysis/componentSummary";

type FileProps = {
  fileID: string;
  personalToken: string;
};

type LoadingStatus =
  | "LOADING_DOCUMENT"
  | "LOADING_IMAGES"
  | "ANALYSING"
  | "LINTING"
  | "NONE";

export default function File({ fileID, personalToken }: FileProps) {
  const [fileData, setFileData] = useState<FileData>(null);
  const [summary, setSummary] = useState<ComponentSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingStatus>("NONE");
  const [imageData, setImageData] = useState<ImageData>(null);

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
        await nextTick(() => {
          const summary = componentSummary(fileData);
          setSummary(summary);
        });

        setLoading("LOADING_IMAGES");
        const componentIds = Object.keys(fileData.components);
        const images = await fetchImages(fileID, personalToken, componentIds);
        setImageData(images);

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
        />
      ) : null}
    </div>
  );
}

function nextTick(fn: Function): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      fn();
      resolve();
    }, 0);
  });
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
    LINTING: "Linting...",
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
