import simpleDocument from "../sample-data/simpleDocument";
import findStyles, {
  FoundStyles,
  findTextNodesWithInlineStyles
} from "./findStyles";
import { buildIndex } from "./indexBuilder";

it("finds styles", () => {
  const styles = findStyles(simpleDocument);
  const expected: FoundStyles = {
    fill: {
      "1:7": {
        meta: {
          key: "2a4d9307a0f2fc42ff4e4eae7991b557b8618c73",
          name: "red",
          styleType: "FILL"
        },
        definition: [
          {
            blendMode: "NORMAL",
            type: "SOLID",
            color: {
              r: 1,
              g: 0,
              b: 0,
              a: 1
            }
          }
        ]
      }
    },
    text: {
      "1:4": {
        meta: {
          key: "6423a47a86252d4f1f83891572fef19b8a8dfcc5",
          name: "Heading",
          styleType: "TEXT"
        },
        definition: {
          fontFamily: "Roboto",
          fontPostScriptName: "Roboto-Bold",
          fontWeight: 700,
          fontSize: 21,
          textAlignHorizontal: "LEFT",
          textAlignVertical: "TOP",
          letterSpacing: 0,
          lineHeightPx: 24.609375,
          lineHeightPercent: 100,
          lineHeightUnit: "INTRINSIC_%"
        }
      }
    },
    effect: {}
  };

  expect(styles).toEqual(expected);
});

it("finds text nodes that use inline styles", () => {
  const index = buildIndex(simpleDocument);
  const result = findTextNodesWithInlineStyles(simpleDocument, index);
  expect(result.length).toEqual(8);
});
