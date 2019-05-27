/**
 * Returns a promise of the result of a function that will be run on the next tick.
 *
 * Useful for yielding the event loop back to the UI before locking it up again with some expensive work.
 *
 * @param fn A function to run on the next tick.
 */
export default function nextTick<T>(fn: () => T): Promise<T> {
  return new Promise(resolve => {
    setImmediate(() => {
      resolve(fn());
    });
  });
}
