import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

import Icon, { IconName } from "../Icon";
import { ColorValues, Colors, TextStyle } from "..";

interface CButtonProps {
  type: "primary" | "base";
  size: "sm" | "md";
  shadow: boolean;
  bgColor: ColorValues;
}

export type ListMenu = {
  icon: IconName;
  iconColor: ColorValues;
  label: string;
  onClick: () => void;
};

interface Props extends Partial<CButtonProps> {
  icon?: IconName;
  color?: ColorValues;
  onClick?: () => void;
  className?: string;
  listMenu?: ListMenu[] | [];
  showMenu?: boolean;
  menuPosition?: "left" | "right";
}

const CircleButton = ({
  icon = "plus",
  type = "base",
  onClick,
  size = "md",
  shadow = true,
  color = Colors.PRIMARY_10,
  bgColor = Colors.NEUTRAL_10,
  className = "",
  listMenu = [],
  showMenu,
  menuPosition = "left",
}: Props) => {
  const container = useRef<HTMLDivElement | null>(null);

  return (
    <Container ref={container}>
      <CButton
        size={size}
        shadow={shadow}
        type={type}
        onClick={onClick}
        bgColor={bgColor}
        className={className}
      >
        <Icon
          name={icon}
          className="icon-btn"
          color={type === "primary" ? Colors.NEUTRAL_10 : color}
        />
      </CButton>

      {showMenu && listMenu.length && container.current
        ? ReactDOM.createPortal(
            <MenuList
              right={menuPosition === "right" ? "5px" : "auto"}
              left={menuPosition === "left" ? "5px" : "auto"}
            >
              {listMenu.map((item, i) => (
                <Menu key={i} onClick={item.onClick}>
                  <Icon name={item.icon} size="lg" color={item.iconColor} />
                  <TextStyle size="xs">{item.label}</TextStyle>
                </Menu>
              ))}
            </MenuList>,
            container.current
          )
        : null}
    </Container>
  );
};

export default CircleButton;

const Container = styled.div`
  position: relative;
`;

const CButton = styled.div(
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: `var(--radius-full)`,
    cursor: "pointer",
    transition: "var(--transition)",

    "&:hover": {
      boxShadow: `var(--shadow-md)`,
      "& .icon-btn": {
        transition: "var(--transition)",
        transform: "scale(0.8)",
      },
    },
  },
  ({ type, size, shadow, bgColor }: CButtonProps) => ({
    height: size === "sm" ? "30px" : "40px",
    width: size === "sm" ? "30px" : "40px",
    backgroundColor:
      type === "primary" ? `var(--primary-10)` : `var(--${bgColor})`,
    boxShadow: shadow ? `var(--shadow-sm)` : "none",
    "&:hover": {
      boxShadow: shadow ? `var(--shadow-md)` : "none",
    },
  })
);

const MenuList = styled.div`
  position: absolute;
  z-index: 999;
  right: ${(props: { right: string; left: string }) => props.right};
  left: ${(props: { left: string; right: string }) => props.left};
  top: 50px;
  width: 150px;
  height: fit-content;
  background-color: var(--neutral-10);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 6px 10px;
  transition: var(--transition);

  ${"&:hover"} {
    background-color: var(--neutral-20);
  }
`;
