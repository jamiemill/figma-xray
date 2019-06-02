import { FileResponse, Node, Instance } from "figma-js";

export type Index = {
  paths: PathsIndex;
  instances: InstancesIndex;
};
export type NodePath = Array<Node>;
type PathsIndex = { [nodeID: string]: NodePath };
type InstancesIndex = { [componentID: string]: Array<Instance> };

/**
 * Build:
 * - map of nodeId => full path for every node
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
  pathMemo: NodePath = []
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
  // We don't do this if its an instance as we don't want to look inside instances.
  // they will be analysed by looking inside their parent component instead.
  // NOTE: this probably means we're under-counting instances of components that have
  // been swapped in as replacement children of an instance.

  if (node.type !== "INSTANCE" && "children" in node) {
    const newPathMemo = pathMemo.concat([node]);
    node.children.forEach(child => indexRecursion(child, index, newPathMemo));
  }

  return index;
}
