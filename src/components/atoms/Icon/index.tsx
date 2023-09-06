import React from "react";
import styled from "@emotion/styled";

/** hero icon with esm support,
 * failed to run test if the icon imported from not esm
 */
import AdjustmentsVerticalIcon from "@heroicons/react/24/outline/AdjustmentsVerticalIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import ListBulletIcon from "@heroicons/react/24/outline/ListBulletIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import StarIcon from "@heroicons/react/24/outline/StarIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

import StarIconSolid from "@heroicons/react/24/solid/StarIcon";

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
  | "check"
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

const getIconSize = {
  sm: { height: "12px", width: "12px" },
  md: { height: "16px", width: "16px" },
  lg: { height: "22", width: "22" },
};

const Icon = ({
  name,
  className = "",
  color = Colors.NEUTRAL_30,
  size = "md",
}: Props) => {
  const iconStyle = getIconSize[size];
  switch (name) {
    case "plus":
      return (
        <IconContainer color={color} size={size} className={className}>
          <PlusIcon style={iconStyle} />
        </IconContainer>
      );
    case "ellipse-horizontal":
      return (
        <IconContainer color={color} size={size} className={className}>
          <EllipsisHorizontalIcon style={iconStyle} />
        </IconContainer>
      );
    case "bar-3":
      return (
        <IconContainer color={color} size={size} className={className}>
          <Bars3Icon style={iconStyle} />
        </IconContainer>
      );
    case "search":
      return (
        <IconContainer color={color} size={size} className={className}>
          <MagnifyingGlassIcon style={iconStyle} />
        </IconContainer>
      );
    case "star-outlined":
      return (
        <IconContainer color={color} size={size} className={className}>
          <StarIcon style={iconStyle} />
        </IconContainer>
      );
    case "star-solid":
      return (
        <IconContainer color={color} size={size} className={className}>
          <StarIconSolid style={iconStyle} />
        </IconContainer>
      );
    case "chevron-left":
      return (
        <IconContainer color={color} size={size} className={className}>
          <ChevronLeftIcon style={iconStyle} />
        </IconContainer>
      );
    case "ellipse-vertical":
      return (
        <IconContainer color={color} size={size} className={className}>
          <EllipsisVerticalIcon style={iconStyle} />
        </IconContainer>
      );
    case "x-mark":
      return (
        <IconContainer color={color} size={size} className={className}>
          <XMarkIcon style={iconStyle} />
        </IconContainer>
      );
    case "trash":
      return (
        <IconContainer color={color} size={size} className={className}>
          <TrashIcon style={iconStyle} />
        </IconContainer>
      );
    case "pencil":
      return (
        <IconContainer color={color} size={size} className={className}>
          <PencilSquareIcon style={iconStyle} />
        </IconContainer>
      );
    case "list":
      return (
        <IconContainer color={color} size={size} className={className}>
          <ListBulletIcon style={iconStyle} />
        </IconContainer>
      );
    case "adjust":
      return (
        <IconContainer color={color} size={size} className={className}>
          <AdjustmentsVerticalIcon style={iconStyle} />
        </IconContainer>
      );
    case "check":
      return (
        <IconContainer color={color} size={size} className={className}>
          <CheckIcon style={iconStyle} />
        </IconContainer>
      );
  }
};

export default Icon;

const IconContainer = styled.div({}, ({ size, color }: IconProps) => ({
  height: size === "sm" ? "14px" : size === "md" ? "18px" : "24px",
  width: size === "sm" ? "14px" : size === "md" ? "18px" : "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: `var(--${color})`,
}));
