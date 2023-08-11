"use client";

import React from "react";
import styled from "@emotion/styled";

import CircleButton, { ListMenu } from "@/components/atoms/CircleButton";
import { IconName } from "@/components/atoms/Icon";

interface Props {
  children?: React.ReactNode;
  leftTitle?: boolean;
  steps: string[];
  leftIcon?: IconName;
  rightIcon?: IconName;
  onClickNavLeft?: () => void;
  onClickNavRight?: () => void;
  listMenu1?: ListMenu[];
  listMenu2?: ListMenu[];
  showMenu1?: boolean;
  showMenu2?: boolean;
}

const Navbar = ({
  steps,
  onClickNavLeft,
  onClickNavRight,
  children,
  leftIcon,
  rightIcon,
  leftTitle = false,
  listMenu1,
  listMenu2,
  showMenu1,
  showMenu2,
}: Props) => {
  return (
    <NavbarContainer leftTitle={leftTitle}>
      {steps.length > 1 ? (
        <CircleButton icon="chevron-left" onClick={onClickNavLeft} />
      ) : (
        <CircleButton
          icon={leftIcon}
          onClick={onClickNavLeft}
          listMenu={listMenu1}
          showMenu={showMenu1}
        />
      )}
      <div className="title">{children}</div>
      {rightIcon && (
        <CircleButton
          icon={rightIcon}
          onClick={onClickNavRight}
          listMenu={listMenu2}
          showMenu={showMenu2}
          menuPosition="right"
        />
      )}
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
