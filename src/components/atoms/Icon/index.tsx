import styled from "@emotion/styled";
import React from "react";
import {
  Bars3Icon,
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { ColorValues, Colors } from "..";

export type IconName =
  | "plus"
  | "ellipse-horizontal"
  | "bar-3"
  | "search"
  | "star-outlined"
  | "star-solid"
  | "chevron-left"
  | "x-mark"
  | "ellipse-vertical";

interface Props {
  name: IconName;
  color?: ColorValues;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Icon = ({ name, className = "", color = Colors.NEUTRAL_30 }: Props) => {
  const iconStyle = { height: "24px", width: "24px" };
  switch (name) {
    case "plus":
      return (
        <IconContainer color={color}>
          <PlusIcon style={iconStyle} className={className} />;
        </IconContainer>
      );
    case "ellipse-horizontal":
      return (
        <IconContainer color={color}>
          <EllipsisHorizontalIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "bar-3":
      return (
        <IconContainer color={color}>
          <Bars3Icon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "search":
      return (
        <IconContainer color={color}>
          <MagnifyingGlassIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "star-outlined":
      return (
        <IconContainer color={color}>
          <StarIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "star-solid":
      return (
        <IconContainer color={color}>
          <StarIconSolid style={iconStyle} className={className} />
        </IconContainer>
      );
    case "chevron-left":
      return (
        <IconContainer color={color}>
          <ChevronLeftIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "ellipse-vertical":
      return (
        <IconContainer color={color}>
          <EllipsisVerticalIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "x-mark":
      return (
        <IconContainer color={color}>
          <XMarkIcon style={iconStyle} className={className} />
        </IconContainer>
      );
  }
};

export default Icon;

const IconContainer = styled.div`
  height: 24px;
  width: 24px;
  color: ${(props: { color?: ColorValues }) =>
    `var(--${props.color})` || "var(--neutral-40)"};
`;
