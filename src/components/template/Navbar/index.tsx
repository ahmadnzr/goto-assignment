"use client";

import React from "react";
import styled from "@emotion/styled";

import TextStyle from "@/components/atoms/TextStyle";
import CircleButton from "@/components/atoms/CircleButton";
import { Colors } from "@/components/atoms";
import { IconName } from "@/components/atoms/Icon";

interface Props {
  title?: string;
  steps: string[];
  leftIcon?: IconName;
  rightIcon?: IconName;
  onClickNavLeft?: () => void;
  onClickNavRight?: () => void;
}

const Navbar = ({
  steps,
  onClickNavLeft,
  onClickNavRight,
  title,
  leftIcon,
  rightIcon,
}: Props) => {
  return (
    <NavbarContainer>
      {steps.length > 1 ? (
        <CircleButton icon="chevron-left" onClick={onClickNavLeft} />
      ) : (
        <CircleButton icon={leftIcon} onClick={onClickNavLeft} />
      )}
      <TextStyle size="lg" weight="bold" color={Colors.PRIMARY_10}>
        {title}
      </TextStyle>
      {rightIcon && <CircleButton icon={rightIcon} onClick={onClickNavRight} />}
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
