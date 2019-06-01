import { componentSummary } from "../analysis/componentSummary";

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.addEventListener("message", ({ data }) => {
  const summary = componentSummary(data);
  ctx.postMessage(summary);
});

export default {};
