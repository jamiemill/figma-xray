import * as Figma from "figma-js";

export type FileData = Figma.FileResponse | null;

export function fetchDocument(
  fileURL: string,
  personalToken: string
): Promise<FileData> {
  const p = new Promise<FileData>((resolve, reject) => {
    if (!fileURL || !personalToken) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: personalToken
    });
    client
      .file(fileURL)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
  return p;
}

type Images = {
  [key: string]: string;
};

export function fetchImage(
  fileURL: string,
  personalToken: string,
  nodeID: string
): Promise<Images> {
  const p = new Promise<Images>((resolve, reject) => {
    if (!fileURL || !personalToken) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: personalToken
    });
    client
      .fileImages(fileURL, { ids: [nodeID], scale: 2, format: "jpg" })
      .then(({ data }) => {
        resolve(data.images);
      })
      .catch(reject);
  });
  return p;
}
