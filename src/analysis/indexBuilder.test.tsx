import simpleDocument from "../sample-data/simpleDocument";
import { buildIndex, Index } from "./indexBuilder";

describe("indexing", () => {
  let index: Index;

  beforeAll(() => {
    index = buildIndex(simpleDocument);
  });

  it("can build a paths index", () => {
    expect(index.paths["1:3"]).toEqual([
      {
        name: "Document",
        type: "DOCUMENT",
        id: "0:0"
      },
      {
        name: "Page 1",
        type: "CANVAS",
        id: "0:1"
      },
      {
        name: "Frame A",
        type: "FRAME",
        id: "1:2"
      }
    ]);
  });

  it("can built an instances index", () => {
    expect(Object.keys(index.instances)).toEqual(["4:4", "14:15", "28:2"]);

    expect(index.instances["4:4"].map(_ => _.name)).toEqual(["Default"]);
    expect(index.instances["14:15"].map(_ => _.name)).toEqual([
      "Secondary",
      "Another Secondary"
    ]);
    expect(index.instances["28:2"].map(_ => _.name)).toEqual([
      "OnlyUsedInAnotherComponent"
    ]);
  });
});
