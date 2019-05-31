const ctx: Worker = self as any;

ctx.postMessage({ foo: "foo" });
ctx.addEventListener("message", event => console.log("from parent", event));

// dummy export to keep typescript happy at the point of importing this file.
// this shouldn't be necessary but the worker.d.ts file doesn't seem to be working.
class WebpackWorker extends Worker {
  constructor() {
    super("");
  }
}
export default WebpackWorker;
