import { FileResponse, ComponentMetadata, Instance } from "figma-js";

import { NodePath, Index } from "./indexBuilder";

// Components that come from team library won't have a path.
export type MaybeNodePath = NodePath | null;

export type ComponentReport = {
  [componentId: string]: {
    count: Number;
    path: NodePath;
    component: ComponentMetadata;
  };
};

export type ComponentWithStats = {
  id: string;
  path: MaybeNodePath;
  name: string;
  type: "LIBRARY" | "DOCUMENT" | "DELETED_FROM_DOCUMENT";
  count: Number;
  instances: Array<Instance>;
};

export type ComponentSummary = {
  LIBRARY: Array<ComponentWithStats>;
  DOCUMENT: Array<ComponentWithStats>;
  DELETED_FROM_DOCUMENT: Array<ComponentWithStats>;
};

export function componentSummary(
  documentResponse: FileResponse,
  index: Index
): ComponentSummary {
  const summary: ComponentSummary = {
    LIBRARY: [],
    DOCUMENT: [],
    DELETED_FROM_DOCUMENT: []
  };
  const allComponents = documentResponse.components;

  Object.keys(allComponents).forEach((componentId: string) => {
    const component = allComponents[componentId];
    const path = componentId in index.paths ? index.paths[componentId] : null;
    const type = component.key
      ? "LIBRARY"
      : path
      ? "DOCUMENT"
      : "DELETED_FROM_DOCUMENT";
    const count = index.instances[componentId].length;

    const componentWithStats: ComponentWithStats = {
      id: componentId,
      name: component.name,
      path: path,
      type: type,
      count: count,
      instances: index.instances[componentId]
    };

    // Ignore library components that aren't showing any usage. That's because they're just being used inside other components.
    if (type === "LIBRARY" && count === 0) return;

    summary[type].push(componentWithStats);
  });

  return summary;
}
