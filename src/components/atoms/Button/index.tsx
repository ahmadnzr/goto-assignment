import React from "react";
import styled from "@emotion/styled";

interface ButtonType {
  variant: "contained" | "text" | "ghost";
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

const CButton = styled.button(
  {
    border: "none",
    fontWeight: 700,
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "var(--transition)",

    "&:hover": {
      opacity: 0.8,
    },
  },
  ({ variant }: ButtonType) => ({
    padding: variant === "text" ? "0" : "10px 20px",
    backgroundColor:
      variant === "contained" ? "var(--primary-10)" : "var(--neutral-10)",
    color: variant === "contained" ? "var(--neutral-10)" : "var(--primary-10)",
  })
);
