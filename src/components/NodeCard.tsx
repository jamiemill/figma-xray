import React, { useState } from "react";
import styled, { css } from "styled-components";
import componentIcon from "../icons/ComponentIcon.svg";
import pageIcon from "../icons/PageIcon.svg";
import textIcon from "../icons/TextIcon.svg";
import { Path } from "../analysis/query";
import { ComponentWithStats } from "../analysis/componentSummary";
import { ImageData } from "../api";
import { Count } from "./Count";
import { NodeWithXRayData } from "../analysis/findStyles";
import { lightGrey, figmaComponentPurple } from "../styles";

export type ComponentProps = {
  component: ComponentWithStats;
  imageData: ImageData;
};

export type NodeCardProps = {
  imageData: ImageData;
  node: NodeWithXRayData;
};

export function NodeCard({ imageData, node }: NodeCardProps) {
  return (
    <NodeCardContainer>
      <NodeCardPath>{node.path && node.path.join(" ▸ ")}</NodeCardPath>
      <NodeCardName type="TEXT">
        <img src={textIcon} alt="Figma Text Icon" /> {node.node.name}
      </NodeCardName>
      <NodeCardImageContainer>
        {imageData && (
          <img
            srcSet={imageData[node.node.id] + " 2w"}
            sizes="1px"
            src={imageData[node.node.id]}
            alt="Component Preview"
          />
        )}
      </NodeCardImageContainer>
    </NodeCardContainer>
  );
}

export function ComponentNodeCard({ component, imageData }: ComponentProps) {
  const [expandInstances, setExpandInstances] = useState<boolean>(false);
  return (
    <NodeCardContainer>
      <NodeCardPath>
        {component.path && component.path.join(" ▸ ")}
      </NodeCardPath>
      <NodeCardName type="COMPONENT">
        <img src={componentIcon} alt="Figma Component Icon" /> {component.name}
      </NodeCardName>
      <NodeCardImageContainer>
        {imageData && (
          <img
            srcSet={imageData[component.id] + " 2w"}
            sizes="1px"
            src={imageData[component.id]}
            alt="Component Preview"
          />
        )}
      </NodeCardImageContainer>
      <NodeCardInstanceCount
        onClick={() => setExpandInstances(!expandInstances)}
      >
        <Count>{component.count}</Count>{" "}
        {component.count === 0
          ? "instances"
          : component.count === 1
          ? "instance..."
          : "instances..."}
      </NodeCardInstanceCount>
      {expandInstances ? (
        <InstanceList instances={component.instances} />
      ) : null}
    </NodeCardContainer>
  );
}
function InstanceList({
  instances
}: {
  instances: Array<{
    path: Path;
  }>;
}) {
  return (
    <InstanceListContainer>
      {instances.map(
        (ins, i) =>
          ins.path && (
            <div key={i}>
              <img src={pageIcon} alt="Figma Page Icon" />{" "}
              {ins.path.join(" > ")}
            </div>
          )
      )}
    </InstanceListContainer>
  );
}

const NodeCardContainer = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 20px;
  border-radius: 3px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(25, 25, 25, 0.06) 0px 7px 15px 0px;
`;
const NodeCardImageContainer = styled.div`
  margin: 20px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  img {
    max-width: 200px;
    max-height: 200px;
  }
`;
const NodeCardPath = styled.div`
  color: ${lightGrey};
  font-size: 85%;
  margin-bottom: 10px;
`;
const NodeCardName = styled.div<{ type: string }>`
  /* font-weight: bold; */
  color: ${lightGrey};
  ${props =>
    props.type === "COMPONENT" &&
    css`
      color: ${figmaComponentPurple};
    `}
`;
const NodeCardInstanceCount = styled.div`
  cursor: pointer;
  font-size: 85%;
`;

const InstanceListContainer = styled.div`
  font-size: 85%;
  margin-top: 10px;
  margin-left: 5px;
`;

export const NodeCardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;