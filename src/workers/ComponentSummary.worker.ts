import { componentSummary } from "../analysis/componentSummary";

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.addEventListener("message", ({ data: { fileData, index } }) => {
  const summary = componentSummary(fileData, index);
  ctx.postMessage(summary);
});

export default {};
