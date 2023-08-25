import styled from "@emotion/styled";
import React from "react";
import { CircleButton, Colors, Icon, TextStyle } from "..";

interface Props {
  name: string;
  value: string;
  error?: string;
  placeholder?: string;
  onChange?: () => void;
  deleteAble?: boolean;
}

const Input = ({
  name,
  value,
  error = "",
  onChange,
  placeholder,
  deleteAble = false,
}: Props) => {
  return (
    <InputContainer>
      <CInput error={error} type="text" placeholder={placeholder} />
      {error && (
        <TextStyle size="xxs" color={Colors.ERROR} className="input-error">
          * {error}
        </TextStyle>
      )}
      {deleteAble && (
        <IconContainer>
          <CircleButton
            size="sm"
            icon="x-mark"
            color={Colors.ERROR}
            bgColor={Colors.NEUTRAL_20}
            shadow={false}
          />
        </IconContainer>
      )}
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  position: relative;
  ${"& .input-error"} {
    margin-top: 2px;
  }
`;

const CInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  color: var(--neutral-50);
  border: ${(props: { error: string }) =>
    props.error ? "1px solid var(--error)" : "1px solid var(--neutral-20)"};
  transition: var(--transition);
  border-radius: var(--radius-sm);

  ${"&:focus"} {
    outline: none;
    border: ${(props: { error: string }) =>
      props.error ? "1px solid var(--error)" : "1px solid var(--neutral-30)"};
  }
  ${"&::placeholder"} {
    color: var(--neutral-30);
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
`;
