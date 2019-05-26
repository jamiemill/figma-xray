export function flatten<T>(arr: Array<Array<T>>): Array<T> {
  return arr.reduce((prev, current) => prev.concat(current), []);
}
