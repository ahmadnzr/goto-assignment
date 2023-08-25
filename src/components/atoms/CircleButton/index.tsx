import React from "react";
import styled from "@emotion/styled";

import Icon, { IconName } from "../Icon";

interface CButtonProps {
  type: "primary" | "base";
}

interface Props extends Partial<CButtonProps> {
  icon?: IconName;
  onClick?: () => void;
}

const CircleButton = ({ icon = "plus", type = "base", onClick }: Props) => {
  return (
    <CButton type={type} onClick={onClick}>
      <Icon name={icon} className="icon-btn" />
    </CButton>
  );
};

export default CircleButton;

const CButton = styled.div(
  {
    height: "40px",
    width: "40px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: `var(--neutral-10)`,
    border: "none",
    borderRadius: `var(--radius-full)`,
    boxShadow: `var(--shadow-sm)`,
    cursor: "pointer",
    transition: "var(--transition)",

    "&:hover": {
      boxShadow: `var(--shadow-md)`,
      "& .icon-btn": {
        transition: "var(--transition)",
        transform: "scale(0.8)",
      },
    },
  },
  ({ type }: CButtonProps) => ({
    ...(type === "primary"
      ? {
          backgroundColor: `var(--primary-10)`,
          color: `var(--neutral-10)`,
        }
      : {
          backgroundColor: `var(--neutral-10})`,
          color: `var(--primary-10)`,
        }),
  })
);
