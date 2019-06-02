import { fetchImages } from "./api";
import debounce from "debounce";

type QueuedImageRequest = {
  nodeID: string;
  resolve: (url: string) => void;
  reject: (reason: any) => void;
};

const DEBOUNCE_QUEUE_PROCESSING = 100;

export default class ImageManager {
  personalToken: string;
  fileID: string;
  cache: { [nodeID: string]: string };
  queue: Array<QueuedImageRequest>;
  _debouncedProcessQueue: () => void;

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

    this._debouncedProcessQueue = debounce(
      this._processQueue,
      DEBOUNCE_QUEUE_PROCESSING
    );
  }

  async getPreview(nodeID: string) {
    if (this.cache[nodeID]) {
      return this.cache[nodeID];
    }
    const url = await this._enqueue(nodeID);
    this.cache[nodeID] = url;
    return url;
  }

  _enqueue(nodeID: string) {
    const promise = new Promise<string>((resolve, reject) => {
      this.queue.push({
        nodeID,
        resolve,
        reject
      });
    });
    this._debouncedProcessQueue();
    return promise;
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

  async _fetchImages(nodeIDs: string[]) {
    return await fetchImages(this.fileID, this.personalToken, nodeIDs);
  }
}
