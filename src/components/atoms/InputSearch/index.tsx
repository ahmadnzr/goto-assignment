"use client";

import React, { useRef, useState } from "react";
import styled from "@emotion/styled";

import CircleButton from "../CircleButton";

interface Props {
  value: string;
  onChange: () => void;
  onReset: () => void;
}

const InputSearch = ({ value, onChange, onReset }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <Container focus={searchFocus}>
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        ref={inputRef}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
        onChange={onChange}
      />
      <IconContainer>
        {value?.length ? (
          <CircleButton icon="x-mark" type="primary" onClick={onReset} />
        ) : (
          <CircleButton icon="search" type="primary" />
        )}
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
