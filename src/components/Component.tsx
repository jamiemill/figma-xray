import React, { useState } from "react";
import styled from "styled-components";
import componentIcon from "../icons/ComponentIcon.svg";
import pageIcon from "../icons/PageIcon.svg";
import { Path } from "../analysis/query";
import { ComponentWithStats } from "../analysis/componentSummary";
import { ImageData } from "../api";

export type ComponentProps = {
  component: ComponentWithStats;
  imageData: ImageData;
};

export function Component({ component, imageData }: ComponentProps) {
  const [expandInstances, setExpandInstances] = useState<boolean>(false);
  return (
    <ComponentContainer>
      <ComponentPath>
        {component.path && component.path.join(" > ")}
      </ComponentPath>
      <ComponentName>
        <img src={componentIcon} alt="Figma Component Icon" /> {component.name}
      </ComponentName>
      <ComponentImageContainer>
        {imageData && (
          <img
            srcSet={imageData[component.id] + " 2w"}
            sizes="1px"
            src={imageData[component.id]}
            alt="Component Preview"
          />
        )}
      </ComponentImageContainer>
      <ComponentCount onClick={() => setExpandInstances(!expandInstances)}>
        <Count>{component.count}</Count>{" "}
        {component.count === 0
          ? "instances"
          : component.count === 1
          ? "instance..."
          : "instances..."}
      </ComponentCount>
      {expandInstances ? (
        <InstanceList instances={component.instances} />
      ) : null}
    </ComponentContainer>
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
const InstanceListContainer = styled.div`
  font-size: 85%;
  margin-top: 10px;
  margin-left: 5px;
`;
const ComponentContainer = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 20px;
  border-radius: 3px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(25, 25, 25, 0.06) 0px 7px 15px 0px;
`;
const ComponentImageContainer = styled.div`
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
const ComponentPath = styled.div`
  color: #999;
  font-size: 85%;
  margin-bottom: 4px;
`;
const ComponentName = styled.div`
  font-weight: bold;
  color: #7b67fb;
`;
const ComponentCount = styled.div`
  cursor: pointer;
  font-size: 85%;
`;
const Count = styled.span`
  display: inline-block;
  border-radius: 1em;
  background-color: #ddd;
  font-weight: bold;
  padding: 0.2em 0.5em;
`;
