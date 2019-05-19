import React, { useEffect, useState } from "react";

import Report from "./Report";
import { fetchDocument, FileData, ImageData, fetchImages } from "../api";
import { componentSummary, ComponentSummary } from "../analysis/analysis";

type FileProps = {
  fileID: string;
  personalToken: string;
};

export default function File({ fileID, personalToken }: FileProps) {
  const [fileData, setFileData] = useState<FileData>(null);
  const [summary, setSummary] = useState<ComponentSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<
    "LOADING_DOCUMENT" | "LOADING_IMAGES" | "LINTING" | "NONE"
  >("NONE");
  const [imageData, setImageData] = useState<ImageData>(null);
  const [lintErrors, setLintErrors] = useState<any>(null);

  useEffect(() => {
    const loadEverything = async () => {
      setLoading("LOADING_DOCUMENT");
      setFileData(null);
      setImageData(null);
      setError(null);
      const fileData = await fetchDocument(fileID, personalToken);
      setFileData(fileData);

      if (fileData) {
        const summary = componentSummary(fileData);
        setSummary(summary);
      }

      setLoading("LOADING_IMAGES");
      const componentIds = fileData ? Object.keys(fileData.components) : [];
      const images = await fetchImages(fileID, personalToken, componentIds);
      setImageData(images);

      setLoading("NONE");
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
      {
        {
          NONE: null,
          LOADING_DOCUMENT: "Loading document...",
          LOADING_IMAGES: "Loading images...",
          LINTING: "Linting..."
        }[loading]
      }
      {error ? error : null}
      {fileData ? (
        <Report
          fileID={fileID}
          fileData={fileData}
          summary={summary}
          imageData={imageData}
          lintErrors={lintErrors}
        />
      ) : null}
    </div>
  );
}
