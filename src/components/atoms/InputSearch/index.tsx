"use client";

import React, { useRef, useState } from "react";
import styled from "@emotion/styled";

import CircleButton from "../CircleButton";

const InputSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <Container focus={searchFocus}>
      <Input
        type="text"
        placeholder="Search..."
        ref={inputRef}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
      />
      <IconContainer>
        <CircleButton icon="search" type="primary" />
      </IconContainer>
    </Container>
  );
};

export default InputSearch;

const Container = styled.div(
  {
    position: "relative",
    padding: "12px 14px",
    backgroundColor: `var(--neutral-20)`,
    borderRadius: `var(--radius-md)`,
    boxShadow: `var(--shadow-sm-2)`,
    transition: "var(--transition)",

    "&:hover": {
      boxShadow: `var(--shadow-md-2)`,
    },
  },
  ({ focus }: { focus: boolean }) => ({
    transition: "var(--transition)",
    border: `1px solid var(--${focus ? "primary-10" : "neutral-20"})`,
  })
);

const Input = styled.input({
  width: "100%",
  border: "none",
  backgroundColor: "inherit",
  color: `var(--neutral-40)`,

  "&:focus": {
    outline: "none",
  },
});

const IconContainer = styled.div({
  position: "absolute",
  top: "50%",
  right: 0,

  transform: "translateY(-50%)",
});
