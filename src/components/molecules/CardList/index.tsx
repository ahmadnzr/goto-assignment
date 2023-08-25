"use client";

import React, { useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import { Colors, Icon, TextStyle } from "@/components/atoms";

interface Props {
  isFavorite?: boolean;
  onClick: () => void;
  onClickFav: () => void;
}

const CardList = ({ isFavorite = false, onClick, onClickFav }: Props) => {
  const [clickFav, setClickFav] = useState(false);

  return (
    <CardWrapper onClick={onClick}>
      <Image width="60" height="60" src="/avatar.jpg" alt="" />
      <DetailWrapper>
        <TextStyle weight="bold" size="sm">
          Johndev Simulasi
        </TextStyle>
        <TextStyle
          color={Colors.NEUTRAL_40}
          size="xs"
          className="contact-number"
        >
          +62 897 8891 2323
        </TextStyle>
      </DetailWrapper>
      <ActionWrapper>
        {isFavorite ? (
          <Icon name="star-solid" className="contact-favorite" />
        ) : (
          <Icon name="star-solid" className="contact-regular" />
        )}
      </ActionWrapper>
    </CardWrapper>
  );
};

export default CardList;

const CardWrapper = styled.div({
  padding: "10px 5px",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",

  borderBottom: "1px solid var(--neutral-20)",
  borderRadius: "var(--radius-sm)",
  transition: "var(--transition)",

  "& > img": {
    borderRadius: "100%",
  },

  "&:hover": {
    boxShadow: `var(--shadow-sm)`,
  },
});

const DetailWrapper = styled.div({
  flex: 1,

  "& .contact-number": {
    marginTop: "5px",
  },
});

const ActionWrapper = styled.div({
  "& .contact-favorite, .contact-regular": {
    cursor: "pointer",
    opacity: 0.8,
    transition: "var(--transition)",

    "&:hover": {
      opacity: 1,
    },
  },

  "& .contact-favorite": {
    color: "var(--secondary-10)",
  },

  "& .contact-regular": {
    color: "var(--neutral-30)",
  },
});
