import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Colors, TextStyle } from "@/components";

interface Props {
  totalData: number;
  currentPage: number;
  onClickPage: (id: number) => void;
  rowPerPage: number;
}
const Pagination = ({
  totalData,
  currentPage,
  onClickPage,
  rowPerPage,
}: Props) => {
  const totalPage = Math.ceil(totalData / rowPerPage);
  const handleClickButton = (id: number) => {
    onClickPage(id);
  };

  useEffect(() => {
    console.log("firsrent");
  }, []);
  return (
    <Container>
      {Array.from(Array(totalPage).keys()).map((item, i) => (
        <PaginationButton
          key={i}
          selected={currentPage === i}
          onClick={() => handleClickButton(i)}
        >
          <TextStyle
            size="xxs"
            color={currentPage === i ? Colors.NEUTRAL_10 : Colors.NEUTRAL_50}
          >
            {item + 1}
          </TextStyle>
        </PaginationButton>
      ))}
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const PaginationButton = styled.button(
  {
    border: "none",
    padding: "2px 4px",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
  },
  ({ selected }: { selected: boolean }) => ({
    backgroundColor: selected ? "var(--primary-10)" : "var(--neutral-20)",
  })
);
