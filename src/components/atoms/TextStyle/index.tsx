"use client";

import React from "react";
import styled from "@emotion/styled";

import { ColorValues, Colors } from "..";

interface TextProps {
  weight?: "bold" | "semibold" | "normal" | "thin";
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  color?: ColorValues;
}

interface Props extends TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text = styled.p({}, (props: TextProps) => ({
  fontSize: `var(--text-${props.size})`,
  fontWeight: `var(--font-${props.weight})`,
  color: `var(--${props.color})`,
}));

const TextStyle = ({
  children,
  weight = "normal",
  size = "md",
  color = Colors.NEUTRAL_50,
  className = "",
}: Props) => {
  return (
    <Text {...{ weight, size, color }} className={className}>
      {children}
    </Text>
  );
};

export default TextStyle;
