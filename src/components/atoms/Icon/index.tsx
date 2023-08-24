import styled from "@emotion/styled";
import React from "react";
import {
  Bars3Icon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { ColorValues } from "..";

export type IconName =
  | "plus"
  | "ellipse-horizontal"
  | "bar-3"
  | "search"
  | "star-outlined"
  | "star-solid";

interface Props {
  name: IconName;
  color?: ColorValues;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Icon = ({ name, className = "" }: Props) => {
  const iconStyle = { height: "24px", width: "24px" };
  switch (name) {
    case "plus":
      return <PlusIcon style={iconStyle} className={className} />;
    case "ellipse-horizontal":
      return <EllipsisVerticalIcon style={iconStyle} className={className} />;
    case "bar-3":
      return <Bars3Icon style={iconStyle} className={className} />;
    case "search":
      return <MagnifyingGlassIcon style={iconStyle} className={className} />;
    case "star-outlined":
      return <StarIcon style={iconStyle} className={className} />;
    case "star-solid":
      return <StarIconSolid style={iconStyle} className={className} />;
  }
};

export default Icon;
