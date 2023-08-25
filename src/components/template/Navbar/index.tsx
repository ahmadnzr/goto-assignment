"use client";

import React from "react";
import styled from "@emotion/styled";

import TextStyle from "@/components/atoms/TextStyle";
import CircleButton from "@/components/atoms/CircleButton";
import { Colors } from "@/components/atoms";
import { IconName } from "@/components/atoms/Icon";

interface Props {
  children?: React.ReactNode;
  leftTitle?: boolean;
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
  children,
  leftIcon,
  rightIcon,
  leftTitle = false,
}: Props) => {
  return (
    <NavbarContainer leftTitle={leftTitle}>
      {steps.length > 1 ? (
        <CircleButton icon="chevron-left" onClick={onClickNavLeft} />
      ) : (
        <CircleButton icon={leftIcon} onClick={onClickNavLeft} />
      )}
      <div className="title">{children}</div>
      {rightIcon && <CircleButton icon={rightIcon} onClick={onClickNavRight} />}
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.nav(
  {
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",

    "& .title": {
      flex: 1,
    },
  },
  ({ leftTitle }: { leftTitle: boolean }) => ({
    "& .title": {
      textAlign: leftTitle ? "left" : "center",
    },
  })
);
