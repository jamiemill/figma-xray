import {
  findTextNodesWithInlineStyles,
  InlineTextStyleNodes
} from "../analysis/findStyles";

const ctx: Worker = self as any;

ctx.addEventListener("message", ({ data }) => {
  const result: InlineTextStyleNodes = findTextNodesWithInlineStyles(data);
  ctx.postMessage(result);
});

export default {};
