const ctx: Worker = self as any;

ctx.postMessage({ foo: "foo" });
ctx.addEventListener("message", event => console.log("from parent", event));

export default {};
