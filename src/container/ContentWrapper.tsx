"use client";

import React from "react";
import styled from "@emotion/styled";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default ContentWrapper;

const Container = styled.div`
  width: var(--max-width);
  background-color: var(--neutral-10);
  min-height: 100vh;
  margin: 0 auto;
  padding: 10px;
`;
