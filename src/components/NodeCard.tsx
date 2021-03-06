import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import componentIcon from "../icons/ComponentIcon.svg";
import pageIcon from "../icons/PageIcon.svg";
import textIcon from "../icons/TextIcon.svg";
import {
  ComponentWithStats,
  MaybeNodePath
} from "../analysis/componentSummary";
import { Count } from "./Count";
import { NodeWithXRayData } from "../analysis/findStyles";
import { lightGrey, figmaComponentPurple } from "../styles";
import { Instance } from "figma-js";
import { Index } from "../analysis/indexBuilder";
import ImageManager from "../ImageManager";

export type ComponentProps = {
  component: ComponentWithStats;
  imageManager: ImageManager;
  index: Index;
};

export type NodeCardProps = {
  node: NodeWithXRayData;
  imageManager: ImageManager;
};

export function NodeCard({ node, imageManager }: NodeCardProps) {
  return (
    <NodeCardContainer>
      <NodeCardPath>
        <PathDisplay path={node.path} />
      </NodeCardPath>
      <NodeCardName type="TEXT">
        <img src={textIcon} alt="Figma Text Icon" />{" "}
        {node.node.name.substr(0, 20)}
      </NodeCardName>
      <LazyImage imageManager={imageManager} nodeID={node.node.id} />
    </NodeCardContainer>
  );
}

export function ComponentNodeCard({
  component,
  imageManager,
  index
}: ComponentProps) {
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
      <LazyImage imageManager={imageManager} nodeID={component.id} />
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
        <InstanceList instances={component.instances} index={index} />
      ) : null}
    </NodeCardContainer>
  );
}

function LazyImage({
  nodeID,
  imageManager
}: {
  nodeID: string;
  imageManager: ImageManager;
}) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const url = await imageManager.getPreview(nodeID);
      setUrl(url);
    })();
  }, [nodeID, imageManager]);
  return (
    <NodeCardImageContainer>
      {url ? (
        <img srcSet={url + " 2w"} sizes="1px" src={url} alt="Node Preview" />
      ) : (
        <Loading />
      )}
    </NodeCardImageContainer>
  );
}

function InstanceList({
  instances,
  index
}: {
  instances: Array<Instance>;
  index: Index;
}) {
  return (
    <InstanceListContainer>
      {instances.map((ins, i) => (
        <PathDisplay key={i} path={index.paths[ins.id]} />
      ))}
    </InstanceListContainer>
  );
}

function PathDisplay({ path }: { path: MaybeNodePath }) {
  return path ? (
    <div>
      <img src={pageIcon} alt="Figma Page Icon" />{" "}
      {path.map(node => node.name).join(" ▸ ")}
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
