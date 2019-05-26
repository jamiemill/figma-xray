import { FileResponse, ComponentMetadata } from "figma-js";
import { findInstancesOfComponent, getPathOfNodeWithId } from "./query";
import { Path } from "./query";

export type ComponentReport = {
  [componentId: string]: {
    count: Number;
    path: Path;
    component: ComponentMetadata;
  };
};

// Iterate through components and find all instances.
// This one finds unused components unlike the one below so I favour this.

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
    // ignore library ones with zero usage for now (probably means they are used inside other library components?)
    .filter(_ => !(_.type === "LIBRARY" && _.count === 0));

  return {
    LIBRARY: componentsWithStats.filter(_ => _.type === "LIBRARY"),
    DOCUMENT: componentsWithStats.filter(_ => _.type === "DOCUMENT"),
    DELETED_FROM_DOCUMENT: componentsWithStats.filter(
      _ => _.type === "DELETED_FROM_DOCUMENT"
    )
  };
}
