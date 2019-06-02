import {
  findTextNodesWithInlineStyles,
  InlineTextStyleNodes
} from "../analysis/findStyles";

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.addEventListener("message", ({ data: { fileData, index } }) => {
  const result: InlineTextStyleNodes = findTextNodesWithInlineStyles(
    fileData,
    index
  );
  ctx.postMessage(result);
});

export default {};
