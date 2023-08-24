"use client";

import React from "react";
import styled from "@emotion/styled";

import TextStyle from "@/components/atoms/TextStyle";
import CircleButton from "@/components/atoms/CircleButton";

const Navbar = () => {
  return (
    <NavbarContainer>
      <CircleButton icon="bar-3" />
      <TextStyle size="lg" weight="bold">
        My Phone Book
      </TextStyle>
      <CircleButton icon="plus" />
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.nav({
  padding: "10px 0",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
