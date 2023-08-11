import React, { Dispatch, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

import { Colors, InputSearch, TextStyle } from "@/components/atoms";
import ContentWrapper from "@/container/ContentWrapper";
import Navbar from "../Navbar";

export type Filter = "all" | "fav" | "reg";
interface Props {
  filter: Filter;
  setFilter: Dispatch<React.SetStateAction<Filter>>;
}

const TopContent = ({ filter, setFilter }: Props) => {
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
                selected: filter === "all",
                onClick: () => {
                  setShowmenu(false);
                  setFilter("all");
                },
              },
              {
                label: "Favorite",
                icon: "star-solid",
                iconColor: Colors.SECONDARY_10,
                selected: filter === "fav",
                onClick: () => {
                  setShowmenu(false);
                  setFilter("fav");
                },
              },
              {
                label: "Regular",
                icon: "star-solid",
                selected: filter === "reg",
                iconColor: Colors.NEUTRAL_30,
                onClick: () => {
                  setShowmenu(false);
                  setFilter("reg");
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
  z-index: 9;
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