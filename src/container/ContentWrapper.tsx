"use client";
import styled from "@emotion/styled";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const ContentWrapper = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: var(--max-width);
  height: 100%;
  margin: 0 auto;
  padding-bottom: 50px;
`;

export default ContentWrapper;
