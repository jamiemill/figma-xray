import simpleDocument from "../sample-data/simpleDocument";
import { buildIndex } from "./indexBuilder";

it("can build an index", () => {
  const index = buildIndex(simpleDocument);
  expect(index["1:3"]).toEqual([
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
