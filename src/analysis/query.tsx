import { Node, Instance } from "figma-js";
import { flatten } from "./flatten";

export type Path = Array<string> | false;

// export function getCommentFrame(comment, data) {
//     const rootComment = isReply(comment) ?
//         findCommentById(data.comments, comment.parent_id)
//         : comment;
//     return findChildById(data.document, rootComment.client_meta.node_id);
// }
// function findCommentById(comments, id) {
//     return comments.find(_ => _.id === id);
// }
// function getCommentTags(comment) {
//     return comment.message.match(/#\w+/g) || [];
// }
// function isReply(comment) {
//     return comment.client_meta === null;
// }
// function findChildById(node:Node, id:string): Node | false {
//     // base case
//     if (node.id === id) {
//         return node;
//     }
//     // error case
//     if (!("children" in node)) {
//         return false;
//     }
//     // recursion
//     for (let i = 0; i < node.children.length; i += 1) {
//         let result = findChildById(node.children[i], id);
//         if (result !== false) {
//             return result;
//         }
//     }
//     return false;
// }
// Note this will not descend inside Instances to look for nested instances.
// But it will find instances inside a component, so long as they themselves are not inside other instances.
function findAllInstances(node: Node): Array<Instance> {
  // base case
  if (node.type === "INSTANCE") {
    return [node];
  }
  // error case
  if (!("children" in node)) {
    return [];
  }
  // recursion
  return flatten(node.children.map(findAllInstances));
}
export function findInstancesOfComponent(node: Node, componentId: string) {
  return findAllInstances(node).filter(_ => _.componentId === componentId);
}
export function getPathOfNodeWithId(
  node: Node,
  id: string,
  path: Array<string> = []
): Path {
  const p = _getPathOfNodeWithId(node, id, path);
  return p ? p.slice(1) : false;
}
function _getPathOfNodeWithId(
  node: Node,
  id: string,
  path: Array<string> = []
): Path {
  const name = node.name;
  // base case
  if (node.id === id) {
    return path;
  }
  // error case
  if (!("children" in node)) {
    return false;
  }
  // recursion
  for (let i = 0; i < node.children.length; i += 1) {
    let result = _getPathOfNodeWithId(node.children[i], id, path.concat(name));
    if (result !== false) {
      return result;
    }
  }
  return false;
}
