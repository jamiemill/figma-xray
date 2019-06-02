import { fetchImages } from "./api";

export default class ImageManager {
  personalToken: string;
  fileID: string;
  cache: { [nodeID: string]: string };

  constructor({
    personalToken,
    fileID
  }: {
    personalToken: string;
    fileID: string;
  }) {
    this.personalToken = personalToken;
    this.fileID = fileID;
    this.cache = {};
  }

  async getPreview(nodeID: string) {
    if (this.cache[nodeID]) {
      return this.cache[nodeID];
    }
    const images = await fetchImages(this.fileID, this.personalToken, [nodeID]);
    const url = images[nodeID];
    this.cache[nodeID] = url;
    return url;
  }
}
