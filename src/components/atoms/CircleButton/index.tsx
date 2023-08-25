import React from "react";
import styled from "@emotion/styled";

import Icon, { IconName } from "../Icon";
import { ColorValues, Colors } from "..";

interface CButtonProps {
  type: "primary" | "base";
  size: "sm" | "md";
  shadow: boolean;
  bgColor: ColorValues;
}

interface Props extends Partial<CButtonProps> {
  icon?: IconName;
  color?: ColorValues;
  onClick?: () => void;
}

const CircleButton = ({
  icon = "plus",
  type = "base",
  onClick,
  size = "md",
  shadow = true,
  color = Colors.PRIMARY_10,
  bgColor = Colors.NEUTRAL_10,
}: Props) => {
  return (
    <CButton
      size={size}
      shadow={shadow}
      type={type}
      onClick={onClick}
      bgColor={bgColor}
    >
      <Icon
        name={icon}
        className="icon-btn"
        color={type === "primary" ? Colors.NEUTRAL_10 : color}
      />
    </CButton>
  );
};

export default CircleButton;

const CButton = styled.div(
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    border: "none",
    borderRadius: `var(--radius-full)`,
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
  ({ type, size, shadow, bgColor }: CButtonProps) => ({
    height: size === "sm" ? "30px" : "40px",
    width: size === "sm" ? "30px" : "40px",
    backgroundColor:
      type === "primary" ? `var(--primary-10)` : `var(--${bgColor})`,
    boxShadow: shadow ? `var(--shadow-sm)` : "none",
    "&:hover": {
      boxShadow: shadow ? `var(--shadow-md)` : "none",
    },
  })
);
