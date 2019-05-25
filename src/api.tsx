import * as Figma from "figma-js";

export type FileData = Figma.FileResponse | null;
export type Images = {
  [key: string]: string;
};
export type ImageData = Images | null;
export type StyleData = any;
export type StylesData = any;

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
      .fileImages(fileID, { ids: nodeIDs, scale: 2, format: "png" })
      .then(({ data }) => {
        resolve(data.images);
      })
      .catch(reject);
  });
  return p;
}

export function fetchStyle(
  key: string,
  personalToken: string
): Promise<StyleData> {
  const p = new Promise<StyleData>((resolve, reject) => {
    if (!key || !personalToken) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: personalToken
    });
    client.client
      .get(`styles/${key}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
  return p;
}

export function fetchStyles(
  teamID: string,
  personalToken: string
): Promise<StylesData> {
  const p = new Promise<StylesData>((resolve, reject) => {
    if (!teamID || !personalToken) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: personalToken
    });
    client.client
      .get(`teams/${teamID}/styles`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
  return p;
}
