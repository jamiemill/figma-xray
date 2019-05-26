import simpleDocument from "../sample-data/simpleDocument";
import { componentSummary } from "./componentSummary";

it("can produce a summary", () => {
  const result = componentSummary(simpleDocument);
  const expected = {
    LIBRARY: [],
    DOCUMENT: [
      {
        id: "4:4",
        path: ["Symbols", "Buttons"],
        name: "Default",
        type: "DOCUMENT",
        count: 1,
        instances: [
          {
            path: ["Page 1", "Frame A"]
          }
        ]
      },
      {
        id: "14:15",
        path: ["Symbols", "Buttons"],
        name: "Secondary",
        type: "DOCUMENT",
        count: 2,
        instances: [
          {
            path: ["Page 1", "Frame A"]
          },
          {
            path: ["Page 1", "Frame A"]
          }
        ]
      },
      {
        id: "17:3",
        path: ["Symbols", "Buttons"],
        name: "Secondary",
        type: "DOCUMENT",
        count: 0,
        instances: []
      },
      {
        id: "17:6",
        path: ["Symbols", "Buttons"],
        name: "Feint Button",
        type: "DOCUMENT",
        count: 0,
        instances: []
      },
      {
        id: "28:2",
        path: ["Symbols", "Misc"],
        name: "OnlyUsedInAnotherComponent",
        type: "DOCUMENT",
        count: 1,
        instances: [
          {
            path: ["Symbols", "Cards", "Card"]
          }
        ]
      },
      {
        id: "15:9",
        path: ["Symbols", "Cards"],
        name: "Card",
        type: "DOCUMENT",
        count: 0,
        instances: []
      }
    ],
    DELETED_FROM_DOCUMENT: []
  };
  expect(result).toEqual(expected);
});
