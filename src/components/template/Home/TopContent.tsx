import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

import { Colors, InputSearch, TextStyle } from "@/components/atoms";
import ContentWrapper from "@/container/ContentWrapper";
import Navbar from "../Navbar";

const TopContent = () => {
  const router = useRouter();
  const [showMenu, setShowmenu] = useState(false);
  return (
    <Wrapper>
      <ContentWrapper>
        <Content>
          <Navbar
            steps={[]}
            leftIcon="adjust"
            rightIcon="plus"
            onClickNavLeft={() => {
              setShowmenu((prev) => !prev);
            }}
            onClickNavRight={() => router.push("/contact/add")}
            listMenu1={[
              {
                label: "All Contact",
                icon: "list",
                iconColor: Colors.NEUTRAL_40,
                onClick: () => {
                  setShowmenu(false);
                },
              },
              {
                label: "Favorite",
                icon: "star-solid",
                iconColor: Colors.SECONDARY_10,
                onClick: () => {
                  setShowmenu(false);
                },
              },
              {
                label: "Regular",
                icon: "star-solid",
                iconColor: Colors.NEUTRAL_30,
                onClick: () => {
                  setShowmenu(false);
                },
              },
            ]}
            showMenu1={showMenu}
          >
            <TextStyle size="lg" weight="bold" color={Colors.PRIMARY_10}>
              Contact
            </TextStyle>
          </Navbar>
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
