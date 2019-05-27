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
