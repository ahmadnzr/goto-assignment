"use client";

import { Button, Colors, TextStyle } from "@/components/atoms";
import Input from "@/components/atoms/Input";
import Navbar from "@/components/template/Navbar";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import React from "react";

const AddContact = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar
        steps={["1", "2"]}
        onClickNavLeft={() => router.push("/")}
        leftTitle
      >
        <TextStyle size="md" weight="bold" color={Colors.PRIMARY_10}>
          Add New Contact
        </TextStyle>
      </Navbar>
      <FormGroup>
        <TextStyle size="sm">Name :</TextStyle>
        <Input
          name="name"
          value="Ok"
          placeholder="John Code"
          error="Required"
        />
      </FormGroup>
      <FormGroup>
        <div className="number-section">
          <TextStyle size="sm">Phone Number :</TextStyle>
          <Button variant="text">Add More Number</Button>
        </div>
        <Input name="name" value="Ok" placeholder="0878 92844" deleteAble />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </div>
  );
};

export default AddContact;

const FormGroup = styled.div`
  margin-top: ${(props: { mt?: string }) => props.mt || "10px"};
  display: flex;
  flex-direction: column;
  gap: 5px;

  ${"& .number-section"} {
    display: flex;
    justify-content: space-between;
  }
`;
