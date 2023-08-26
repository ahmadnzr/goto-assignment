"use client";

import React from "react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  padding?: string;
}

const ContentWrapper = ({ children, padding = "0px" }: Props) => {
  return <Wrapper padding={padding}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: var(--max-width);
  height: 100%;
  margin: 0 auto;
  padding: ${(props: { padding: string }) => props.padding};
`;

export default ContentWrapper;
