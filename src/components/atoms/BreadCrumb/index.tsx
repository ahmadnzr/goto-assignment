"use client";

import React from "react";
import { Colors, TextStyle } from "..";
import styled from "@emotion/styled";

interface Props {
  steps: string[];
}
const BreadCrumb = ({ steps }: Props) => {
  return (
    <BreadCrumbContainer>
      {steps.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <CustomText
              size="xxs"
              color={Colors.NEUTRAL_40}
              weight="semibold"
              isActive
            >
              {`${item}`}
            </CustomText>
            <TextStyle size="xs" color={Colors.NEUTRAL_40} weight="semibold">
              {`${steps.length - 1 !== i ? "/" : ""}`}
            </TextStyle>
          </React.Fragment>
        );
      })}
    </BreadCrumbContainer>
  );
};

export default BreadCrumb;

const BreadCrumbContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
`;

const CustomText = styled(TextStyle)`
  padding: 2px 6px;
  border-radius: 10px;
  background-color: ${(props: { isActive: boolean }) =>
    props.isActive ? "var(--neutral-20)" : ""};
`;
