import React from "react";

interface Props {
  children: React.ReactNode;
}

const TextStyle = ({ children }: Props) => {
  return <p>{children}</p>;
};

export default TextStyle;
