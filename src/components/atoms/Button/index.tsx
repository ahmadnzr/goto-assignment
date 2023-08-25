import styled from "@emotion/styled";
import React from "react";

interface Props {
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
}: Props) => {
  return (
    <CButton
      type={type}
      onClick={onClick}
      className={className}
      style={{ width: width === "full" ? "100%" : "fit-content" }}
    >
      {children}
    </CButton>
  );
};

export default Button;

const CButton = styled.button`
  padding: 8px 20px;
  border: none;
  background-color: var(--primary-10);
  color: var(--neutral-10);
  font-weight: 700;
  border-radius: var(--radius-md);
`;
