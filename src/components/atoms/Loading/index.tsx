import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface Props {
  loading: boolean;
}

const Loading = ({ loading }: Props) => {
  const container = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [loading]);

  // if (typeof window === "undefined") return null;

  if (!loading) return;

  return (
    <CustomContainer ref={container}>
      {container.current &&
        ReactDOM.createPortal(
          <Container>
            <Loader>
              <Image
                src="/loading.png"
                width="20"
                height="20"
                alt="loading"
                className="loading"
              />
            </Loader>
          </Container>,
          typeof document !== "undefined" ? document?.body : container.current
        )}
    </CustomContainer>
  );
};

export default Loading;

const CustomContainer = styled.div``;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100vw;
`;

const spin = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  background-color: var(--neutral-10);
  border-radius: var(--radius-sm);

  ${"& .loading"} {
    animation: ${spin} 1s ease infinite;
  }
`;
