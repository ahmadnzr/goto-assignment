import React from "react";
import styled from "@emotion/styled";
import {
  AdjustmentsVerticalIcon,
  Bars3Icon,
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
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
  | "trash"
  | "pencil"
  | "list"
  | "adjust"
  | "ellipse-vertical";

interface IconProps {
  color: ColorValues;
  size: "sm" | "md" | "lg";
}

interface Props extends Partial<IconProps> {
  name: IconName;
  color?: ColorValues;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Icon = ({
  name,
  className = "",
  color = Colors.NEUTRAL_30,
  size = "lg",
}: Props) => {
  const iconStyle = { height: "24px", width: "24px" };
  switch (name) {
    case "plus":
      return (
        <IconContainer color={color} size={size}>
          <PlusIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "ellipse-horizontal":
      return (
        <IconContainer color={color} size={size}>
          <EllipsisHorizontalIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "bar-3":
      return (
        <IconContainer color={color} size={size}>
          <Bars3Icon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "search":
      return (
        <IconContainer color={color} size={size}>
          <MagnifyingGlassIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "star-outlined":
      return (
        <IconContainer color={color} size={size}>
          <StarIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "star-solid":
      return (
        <IconContainer color={color} size={size}>
          <StarIconSolid style={iconStyle} className={className} />
        </IconContainer>
      );
    case "chevron-left":
      return (
        <IconContainer color={color} size={size}>
          <ChevronLeftIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "ellipse-vertical":
      return (
        <IconContainer color={color} size={size}>
          <EllipsisVerticalIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "x-mark":
      return (
        <IconContainer color={color} size={size}>
          <XMarkIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "trash":
      return (
        <IconContainer color={color} size={size}>
          <TrashIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "pencil":
      return (
        <IconContainer color={color} size={size}>
          <PencilSquareIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "list":
      return (
        <IconContainer color={color} size={size}>
          <ListBulletIcon style={iconStyle} className={className} />
        </IconContainer>
      );
    case "adjust":
      return (
        <IconContainer color={color} size={size}>
          <AdjustmentsVerticalIcon style={iconStyle} className={className} />
        </IconContainer>
      );
  }
};

export default Icon;

const IconContainer = styled.div({}, ({ size, color }: IconProps) => ({
  height: size === "sm" ? "14px" : size === "md" ? "18px" : "24px",
  width: size === "sm" ? "14px" : size === "md" ? "18px" : "24px",
  color: `var(--${color})`,
}));
