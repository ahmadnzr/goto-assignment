import React from "react";
import styled from "@emotion/styled";
import { CircleButton, Colors, TextStyle } from "..";

interface Props {
  name: string;
  value: string;
  error?: string;
  placeholder?: string;
  onChange?: () => void;
  deleteAble?: boolean;
  className?: string;
}

const Input = ({
  name,
  value,
  error = "",
  onChange,
  placeholder,
  deleteAble = false,
  className = "",
}: Props) => {
  return (
    <Container className={className}>
      <InputContainer>
        <CInput
          name={name}
          value={value}
          error={error}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
        />
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
      {error && (
        <TextStyle size="xxs" color={Colors.ERROR} className="input-error">
          * {error}
        </TextStyle>
      )}
    </Container>
  );
};

export default Input;

const Container = styled.div`
  position: relative;
  ${"& .input-error"} {
    margin-top: 2px;
  }
`;

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
