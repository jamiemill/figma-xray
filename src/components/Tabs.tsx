import React from "react";
import styled, { css } from "styled-components";
export const Tabs = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
export function Tab({
  name,
  count,
  onClick,
  active
}: {
  name: string;
  count?: number;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <TabContainer active={active} onClick={onClick}>
      <TabTitle>{name}</TabTitle>
      {count !== null ? <TabSubtitle>{count}</TabSubtitle> : null}
    </TabContainer>
  );
}
type TabContainerProps = {
  active: boolean;
};
const TabContainer = styled.div<TabContainerProps>`
  padding: 20px;
  cursor: pointer;
  border-radius: 0.5em;
  margin-right: 20px;
  background-color: #eee;
  ${props =>
    props.active &&
    css`
      background-color: #123;
      color: white;
    `}
`;
const TabTitle = styled.div`
  font-weight: 900;
  margin-bottom: 0.5em;
`;
const TabSubtitle = styled.div``;
