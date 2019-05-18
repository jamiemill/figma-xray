import * as Figma from "figma-js";

export type FileData = Figma.FileResponse | null;
export type Images = {
    [key: string]: string;
};
export type ImageData = Images | null;
  

export function fetchDocument(
  fileID: string,
  personalToken: string
): Promise<FileData> {
  const p = new Promise<FileData>((resolve, reject) => {
    if (!fileID || !personalToken) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: personalToken
    });
    client
      .file(fileID)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
  return p;
}


export function fetchImages(
  fileID: string,
  personalToken: string,
  nodeIDs: Array<string>
): Promise<Images> {
  const p = new Promise<Images>((resolve, reject) => {
    if (!fileID || !personalToken) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: personalToken
    });
    client
      .fileImages(fileID, { ids: nodeIDs, scale: 1, format: "png" })
      .then(({ data }) => {
        resolve(data.images);
      })
      .catch(reject);
  });
  return p;
}
