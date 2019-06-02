import simpleDocument from "../sample-data/simpleDocument";
import { componentSummary } from "./componentSummary";
import { buildIndex } from "./indexBuilder";

it("can produce a summary", () => {
  const index = buildIndex(simpleDocument);
  const result = componentSummary(simpleDocument, index);

  expect(result.LIBRARY.length).toEqual(0);
  expect(result.DOCUMENT.length).toEqual(6);
  expect(result.DELETED_FROM_DOCUMENT.length).toEqual(0);

  expect(
    result.DOCUMENT.map(component => ({
      name: component.name,
      count: component.count
    }))
  ).toEqual([
    { name: "Default", count: 1 },
    { name: "Secondary", count: 2 },
    { name: "Secondary", count: 0 },
    { name: "Feint Button", count: 0 },
    { name: "OnlyUsedInAnotherComponent", count: 1 },
    { name: "Card", count: 0 }
  ]);
});
