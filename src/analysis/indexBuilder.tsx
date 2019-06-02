import { FileResponse, Node, Instance } from "figma-js";
import traverse from "traverse";

export type Index = {
  paths: PathsIndex;
  instances: InstancesIndex;
};
type PathsIndex = { [nodeID: string]: Array<Node> };
type InstancesIndex = { [componentID: string]: Array<Instance> };

/**
 * Build:
 * - map of nodeId => full path for every interesting node (components, instances, text at the moment - so maybe just everything?)
 * - map of componentId => list of related instance nodes
 */

export function buildIndex(documentResponse: FileResponse): Index {
  const allComponentKeys: InstancesIndex = {};
  Object.keys(documentResponse.components).forEach(k => {
    allComponentKeys[k] = [];
  });

  const emptyIndex = {
    paths: {},
    instances: allComponentKeys
  };
  const index = indexRecursion(documentResponse.document, emptyIndex);
  return index;
}

function indexRecursion(
  node: Node,
  index: Index,
  pathMemo: Node[] = []
): Index {
  // Every node we visit gets a top-level entry in the paths index.
  index.paths[node.id] = pathMemo;

  // If it's an instance, add this to the instance index, under its component id.
  if (node.type === "INSTANCE") {
    if (!(node.componentId in index.instances)) {
      index.instances[node.componentId] = [];
    }
    index.instances[node.componentId].push(node);
  }

  // if the node has children, add the current node to a temporary path memo,
  // and then recur this function for all children, but with the deeper path memo.
  if ("children" in node) {
    const newPathMemo = pathMemo.concat([node]);
    node.children.forEach(child => indexRecursion(child, index, newPathMemo));
  }

  return index;
}
