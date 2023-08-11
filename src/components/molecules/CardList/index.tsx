"use client";

import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import { CircleButton, Colors, TextStyle } from "@/components/atoms";

interface Props {
  isFavorite?: boolean;
  onClick: () => void;
  onClickFav: () => void;
  item: { label: string; subLabel: string };
}

const CardList = ({ isFavorite = false, onClick, onClickFav, item }: Props) => {
  return (
    <CardWrapper>
      <Content onClick={onClick}>
        <Image width="60" height="60" src="/avatar.jpg" alt="" />
        <DetailWrapper>
          <TextStyle weight="bold" size="sm">
            {item?.label || "-"}
          </TextStyle>
          <TextStyle
            color={Colors.NEUTRAL_40}
            size="xs"
            className="contact-number"
          >
            {item?.subLabel || "-"}
          </TextStyle>
        </DetailWrapper>
      </Content>
      <ActionWrapper>
        {isFavorite ? (
          <CircleButton
            icon="star-solid"
            shadow={false}
            size="sm"
            color={Colors.SECONDARY_10}
            onClick={onClickFav}
          />
        ) : (
          <CircleButton
            icon="star-solid"
            shadow={false}
            size="sm"
            color={Colors.NEUTRAL_30}
            onClick={onClickFav}
          />
        )}
      </ActionWrapper>
    </CardWrapper>
  );
};

export default CardList;

const CardWrapper = styled.div({
  position: "relative",
  padding: "10px 5px",

  borderBottom: "1px solid var(--neutral-20)",
  borderRadius: "var(--radius-sm)",
  transition: "var(--transition)",

  "&:hover": {
    boxShadow: `var(--shadow-sm)`,
  },
});

const Content = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",

  "& > img": {
    borderRadius: "100%",
  },
});

const DetailWrapper = styled.div({
  flex: 1,

  "& .contact-number": {
    marginTop: "5px",
  },
});

const ActionWrapper = styled.div({
  position: "absolute",
  top: "50%",
  right: "5px",
  transform: "translateY(-50%)",
});
