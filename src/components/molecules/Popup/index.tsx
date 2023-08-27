import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

import { Button, TextStyle } from "@/components/atoms";
import { PopupProps } from "@/helper/types";

type PopupType = "info" | "action";

interface Props extends Partial<PopupProps> {
  type?: PopupType;
  handleCloseBtn?: () => void;
  handleYesBtn?: () => void;
}

const Popup = ({
  title,
  desc,
  type = "info",
  open,
  handleYesBtn,
  handleCloseBtn,
}: Props) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [open]);

  if (!open) return <></>;
  return ReactDOM.createPortal(
    <Container>
      <Content>
        <TextStyle size={desc ? "md" : "sm"} weight="bold" className="title">
          {title}
        </TextStyle>
        {desc && (
          <TextStyle size="sm" className="desc">
            {desc}
          </TextStyle>
        )}

        {type === "action" ? (
          <ActionWrapper>
            <Button width="full" onClick={handleYesBtn}>
              Yes
            </Button>
            <Button variant="text" onClick={handleCloseBtn}>
              Cancel
            </Button>
          </ActionWrapper>
        ) : (
          <Button width="full" onClick={handleYesBtn}>
            OK
          </Button>
        )}
      </Content>
    </Container>,
    document.body
  );
};

export default Popup;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  width: 300px;
  height: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: var(--radius-sm);

  padding: 12px 10px;
  background-color: var(--neutral-10);
  transition: var(--transition);

  display: flex;
  flex-direction: column;
  gap: 10px;

  ${"& .title"} {
    margin: 0 auto;
    max-width: 80%;
  }

  ${"& .desc"} {
  }
`;

const ActionWrapper = styled.div(
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  () => ({})
);
