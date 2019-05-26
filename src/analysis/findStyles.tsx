import { FileResponse, Style, TypeStyle, Paint, Effect, Node } from "figma-js";
import traverse from "traverse";

type FoundTextStyle = {
  meta: Style;
  definition: TypeStyle;
};
type FoundFillStyle = {
  meta: Style;
  definition: ReadonlyArray<Paint>;
};
type FoundEffectStyle = {
  meta: Style;
  definition: ReadonlyArray<Effect>;
};

export type FoundStyles = {
  fill: {
    [key: string]: FoundFillStyle;
  };
  text: {
    [key: string]: FoundTextStyle;
  };
  effect: {
    [key: string]: FoundEffectStyle;
  };
};

function hasKey(node: any, key: string) {
  return node && typeof node === "object" && key in node;
}

/**
 * Finds as many style definitions as it can from within the document.
 *
 * Since style definitions aren't available in the API, we have to find nodes that have styles applied and read the style out of them.
 *
 * This has a limitation that any unused styles can't be read.
 */

export default function findStyles(file: FileResponse): FoundStyles {
  const nodesThatHaveStyles = traverse(file.document)
    .nodes()
    .filter(node => hasKey(node, "type") && hasKey(node, "styles"));

  let result: FoundStyles = {
    fill: {},
    text: {},
    effect: {}
    // also grid, text and background according to StyleKeyType def.
  };

  // TODO: this does extra work if the same style has been used multiple times, but I suppose its harmless.
  nodesThatHaveStyles.forEach(node => {
    if (node.styles.text) {
      const id = node.styles.text;
      result.text[id] = {
        meta: file.styles[id],
        definition: node.style
      };
    }
    if (node.styles.fill) {
      const id = node.styles.fill;
      result.fill[id] = {
        meta: file.styles[id],
        definition: node.fills
      };
    }
    if (node.styles.stroke) {
      const id = node.styles.stroke;
      result.fill[id] = {
        meta: file.styles[id],
        definition: node.strokes
      };
    }
  });

  const styleIDs = Object.keys(file.styles);
  styleIDs.forEach(id => {
    const styleMetadata = file.styles[id];
    styleMetadata.styleType;
  });

  return result;
}
