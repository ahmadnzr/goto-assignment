import React from "react";
import styled from "@emotion/styled";
import { CircleButton, Colors, TextStyle } from "..";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues, Y extends Path<T>> {
  error?: FieldError;
  placeholder?: string;
  deleteAble?: boolean;
  className?: string;
  register: UseFormRegister<T>;
  fieldName: Y;
  options?: RegisterOptions;
  onDeleteField?: () => void;
  defaultValue?: string;
}

const Input = <T extends FieldValues, Y extends Path<T>>({
  error,
  placeholder,
  deleteAble = false,
  className = "",
  register,
  fieldName,
  options,
  onDeleteField,
  defaultValue = "",
}: Props<T, Y>) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (!options?.pattern) return;

    const pattern = options.pattern as RegExp;
    if (
      !pattern.test(key) &&
      key !== "Backspace" &&
      key !== "Enter" &&
      key !== "Tab" &&
      key !== "ArrowRight" &&
      key !== "ArrowLeft"
    ) {
      e.preventDefault();
    }
  };
  return (
    <Container className={className}>
      <InputContainer>
        <CInput
          error={error}
          type="text"
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register(fieldName, options)}
          onKeyDown={handleKeyDown}
          maxLength={options?.maxLength as number}
        />
        {deleteAble && (
          <IconContainer>
            <CircleButton
              size="sm"
              icon="x-mark"
              color={Colors.ERROR}
              bgColor={Colors.NEUTRAL_20}
              shadow={false}
              onClick={onDeleteField}
            />
          </IconContainer>
        )}
      </InputContainer>
      {error && (
        <TextStyle size="xxs" color={Colors.ERROR} className="input-error">
          {error.type === "minLength"
            ? `* Min. ${options?.minLength}`
            : error.type === "required"
            ? `* Field Required`
            : error.message}
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
  border: ${(props: { error?: FieldError }) =>
    props.error ? "1px solid var(--error)" : "1px solid var(--neutral-20)"};
  transition: var(--transition);
  border-radius: var(--radius-sm);

  ${"&:focus"} {
    outline: none;
    border: ${(props: { error?: FieldError }) =>
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
