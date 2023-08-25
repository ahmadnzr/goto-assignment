import React from "react";
import Navbar from "../Navbar";
import { InputSearch } from "@/components/atoms";
import styled from "@emotion/styled";
import ContentWrapper from "@/container/ContentWrapper";

const TopContent = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Content>
          <Navbar
            steps={[]}
            leftIcon="bar-3"
            rightIcon="plus"
            onClickNavLeft={() => {}}
            onClickNavRight={() => {}}
            title="Contact"
          />
          <InputSearch />
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default TopContent;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: var(--floating-top-home);
  background-color: var(--neutral-10);
  padding-bottom: 6px;
`;

const Content = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
