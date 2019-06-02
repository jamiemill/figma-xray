import { FileResponse, Node } from "figma-js";
import traverse from "traverse";

/**
 * try to build:
 * - map of nodeId => full path for every interesting node (components, instances, text at the moment - so maybe just everything?)
 * - map of componentId => list of related instance nodes
 */

export function buildIndex(documentResponse: FileResponse) {
  const index = indexRecursion(documentResponse.document, [], {});
  return index;
}

type Index = { [nodeID: string]: PathElement[] };

function indexRecursion(
  node: Node,
  pathMemo: PathElement[],
  index: Index = {}
): Index {
  // Every node we visit gets a top-level entry in the index.
  index[node.id] = pathMemo;

  // if the node has children, add the current node to a temporary path memo,
  // and then recur this function for all children, but with the deeper path memo.
  if ("children" in node) {
    const newPathMemo = pathMemo.concat([generatePathElement(node)]);
    node.children.forEach(child => indexRecursion(child, newPathMemo, index));
  }

  return index;
}

type PathElement = { name: string; type: string; id: string };

/**
 * Path elements describe a single element in a path of nodes.
 * We could just include a pointer to the real Node, but since
 * we're not interested in children, and for debugging purposes,
 * I'm just including the interesting attributes.
 */
function generatePathElement(node: Node): PathElement {
  return {
    name: node.name,
    type: node.type,
    id: node.id
  };
}
