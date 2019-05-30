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
      <NodeCardPath>
        <PathDisplay path={node.path} />
      </NodeCardPath>
      <NodeCardName type="TEXT">
        <img src={textIcon} alt="Figma Text Icon" />{" "}
        {node.node.name.substr(0, 20)}
      </NodeCardName>
      <MaybeImage imageData={imageData} nodeID={node.node.id} />
    </NodeCardContainer>
  );
}

export function ComponentNodeCard({ component, imageData }: ComponentProps) {
  const [expandInstances, setExpandInstances] = useState<boolean>(false);
  return (
    <NodeCardContainer>
      <NodeCardPath>
        <PathDisplay path={component.path} />
      </NodeCardPath>
      <NodeCardName type="COMPONENT">
        <img src={componentIcon} alt="Figma Component Icon" />{" "}
        {component.name.substr(0, 20)}
      </NodeCardName>
      <MaybeImage imageData={imageData} nodeID={component.id} />
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

function MaybeImage({
  imageData,
  nodeID
}: {
  imageData: ImageData;
  nodeID: string;
}) {
  return (
    <NodeCardImageContainer>
      {imageData && imageData[nodeID] ? (
        <img
          srcSet={imageData[nodeID] + " 2w"}
          sizes="1px"
          src={imageData[nodeID]}
          alt="Node Preview"
        />
      ) : (
        <Loading />
      )}
    </NodeCardImageContainer>
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
      {instances.map((ins, i) => (
        <PathDisplay key={i} path={ins.path} />
      ))}
    </InstanceListContainer>
  );
}

function PathDisplay({ path }: { path: Path }) {
  return path ? (
    <div>
      <img src={pageIcon} alt="Figma Page Icon" /> {path.join(" ▸ ")}
    </div>
  ) : null;
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

const Loading = () => <LoadingStyle>Loading...</LoadingStyle>;

const LoadingStyle = styled.div`
  color: ${lightGrey};
`;
