import { FileResponse, Node, Component, Instance } from "figma-js";

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

function findInstancesOfComponent(node: Node, componentId: string) {
  return findAllInstances(node).filter(_ => _.componentId === componentId);
}

function getPathOfNodeWithId(
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

// iterate through instances and build up a map of components with counts, path etc.
// function componentReportFromInstances(documentResponse) {
//     const allInstances = findAllInstances(documentResponse.document);
//     const allComponents = documentResponse.components;

//     return allInstances.reduce((prev, _) => {
//         if (!prev[_.componentId]) {
//             const component = allComponents[_.componentId];
//             const componentPath = getPathOfNodeWithId(documentResponse.document, _.componentId);
//             const meta = {
//                 count: 0,
//                 path: componentPath
//             };
//             prev[_.componentId] = Object.assign({}, component, meta);
//         }
//         prev[_.componentId].count++;
//         return prev;
//     }, {});
// }

// Another way of doing the above - iterate through components and find all instances.
// This onefinds unused components unlike the one above so I favour this.

export type Path = Array<string> | false;

export type ComponentReport = {
  [componentId: string]: {
    count: Number;
    path: Path;
    component: Component;
  };
};

export function componentReportFromComponents(
  documentResponse: FileResponse
): ComponentReport {
  const allComponents = documentResponse.components;
  let components: ComponentReport = {};
  Object.keys(allComponents).forEach(id => {
    components[id] = {
      component: allComponents[id],
      count: findInstancesOfComponent(documentResponse.document, id).length,
      path: getPathOfNodeWithId(documentResponse.document, id)
    };
  });
  return components;
}

export type ComponentWithStats = {
  id: string;
  path: Path;
  name: string;
  type: "LIBRARY" | "DOCUMENT" | "DELETED_FROM_DOCUMENT";
  count: Number;
  instances: Array<{ path: Path }>;
};

export type ComponentSummary = {
  LIBRARY: Array<ComponentWithStats>;
  DOCUMENT: Array<ComponentWithStats>;
  DELETED_FROM_DOCUMENT: Array<ComponentWithStats>;
};

export function componentSummary(
  documentResponse: FileResponse
): ComponentSummary {
  const components = componentReportFromComponents(documentResponse);
  const componentIds = Object.keys(components);

  const componentsWithStats: ComponentWithStats[] = componentIds
    .map(
      (id: string): ComponentWithStats => ({
        id: id,
        path: components[id].path,
        name: components[id].component.name,
        type: components[id].component.key
          ? "LIBRARY"
          : components[id].path
          ? "DOCUMENT"
          : "DELETED_FROM_DOCUMENT",
        count: components[id].count,
        instances: findInstancesOfComponent(documentResponse.document, id).map(
          instance => ({
            path: getPathOfNodeWithId(documentResponse.document, instance.id)
          })
        )
      })
    )
    .filter(_ => !(_.type === "LIBRARY" && _.count === 0));
  // ignore library ones with zero usage for now (probably means they are used inside other library components?)

  return {
    LIBRARY: componentsWithStats.filter(_ => _.type === "LIBRARY"),
    DOCUMENT: componentsWithStats.filter(_ => _.type === "DOCUMENT"),
    DELETED_FROM_DOCUMENT: componentsWithStats.filter(
      _ => _.type === "DELETED_FROM_DOCUMENT"
    )
  };
}

function flatten<T>(arr: Array<Array<T>>): Array<T> {
  return arr.reduce((prev, current) => prev.concat(current), []);
}

// function byCreated(a:Comment,b:Comment) {
//     if (a.created_at < b.created_at) return -1;
//     if (a.created_at > b.created_at) return 1;
//     return 0;
// }

// function generateFrameURL(frame:FrameBase, {FILE_ID}) {
//     return `https://www.figma.com/proto/${FILE_ID}/?node-id=${encodeURIComponent(frame.id)}`;
// }

// function toCSV(rows) {
//     return rows.map(row => row.map(c=>c.replace(/"/g,'""')).map(c=>`"${c}"`).join("\t")).join("\n");
// }
