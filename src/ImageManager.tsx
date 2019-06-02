import { fetchImages } from "./api";

type QueuedImageRequest = {
  nodeID: string;
  resolve: (url: string) => void;
  reject: (reason: any) => void;
};

const API_REQUEST_INTERVAL = 1000;

export default class ImageManager {
  personalToken: string;
  fileID: string;
  cache: { [nodeID: string]: string };
  queue: Array<QueuedImageRequest>;
  intervalID: number;

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
    this.queue = [];
    this.intervalID = setInterval(() => {
      this._processQueue();
    }, API_REQUEST_INTERVAL);
  }

  destroy() {
    clearInterval(this.intervalID);
  }

  async getPreview(nodeID: string) {
    if (this.cache[nodeID]) {
      return this.cache[nodeID];
    }
    const url = await this._enqueue(nodeID);
    this.cache[nodeID] = url;
    return url;
  }

  async _enqueue(nodeID: string) {
    const promise = new Promise<string>((resolve, reject) => {
      this.queue.push({ nodeID, resolve, reject });
    });
    return promise;
  }

  async _fetchImages(nodeIDs: string[]) {
    return await fetchImages(this.fileID, this.personalToken, nodeIDs);
  }

  async _processQueue() {
    if (this.queue.length === 0) {
      return;
    }
    const queueContents = this.queue;
    console.time("REQUESTING_IMAGES");
    this.queue = [];
    const images = await this._fetchImages(queueContents.map(_ => _.nodeID));
    console.timeEnd("REQUESTING_IMAGES");
    Object.keys(images).forEach(nodeID => {
      const url = images[nodeID];
      const queuedImageRequest =
        queueContents && queueContents.find(_ => _.nodeID === nodeID);
      if (queuedImageRequest) {
        queuedImageRequest.resolve(url);
      }
    });
  }
}
