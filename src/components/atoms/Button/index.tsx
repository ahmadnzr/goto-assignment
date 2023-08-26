import React from "react";
import styled from "@emotion/styled";

interface ButtonType {
  variant: "contained" | "text";
}

interface Props extends Partial<ButtonType> {
  type?: "button" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
  width?: "fit-content" | "full";
  className?: string;
}

const Button = ({
  type = "button",
  children,
  onClick,
  width,
  className = "",
  variant = "contained",
}: Props) => {
  return (
    <CButton
      type={type}
      onClick={onClick}
      className={className}
      variant={variant}
      style={{ width: width === "full" ? "100%" : "fit-content" }}
    >
      {children}
    </CButton>
  );
};

export default Button;

const CButton = styled.button`
  padding: ${(props: ButtonType) =>
    props.variant === "text" ? "0" : "10px 20px"};
  border: none;
  background-color: ${(props: ButtonType) =>
    props.variant === "text" ? "transparent" : "var(--primary-10)"};
  color: ${(props: ButtonType) =>
    props.variant === "text" ? "var(--primary-10)" : "var(--neutral-10)"};
  font-weight: 700;
  cursor: pointer;
  border-radius: var(--radius-md);
`;
