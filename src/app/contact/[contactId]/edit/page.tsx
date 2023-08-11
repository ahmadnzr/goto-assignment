"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

import { Button, Colors, Input, TextStyle } from "@/components/atoms";
import Navbar from "@/components/template/Navbar";

const UpdateContact = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar
        steps={["1", "2"]}
        onClickNavLeft={() => router.push("/contact/2")}
        leftTitle
      >
        <TextStyle size="md" weight="bold" color={Colors.PRIMARY_10}>
          Edit Contact
        </TextStyle>
      </Navbar>
      <FormGroup>
        <TextStyle size="sm">Firstname :</TextStyle>
        <Input name="name" value="" placeholder="John" error="Required" />
      </FormGroup>
      <FormGroup>
        <TextStyle size="sm">LastName :</TextStyle>
        <Input name="name" value="" placeholder="John Due" error="Required" />
      </FormGroup>
      <FormGroup>
        <div className="number-section">
          <TextStyle size="sm">Phone Number :</TextStyle>
          <Button variant="text">Add More Number</Button>
        </div>
        <Input
          name="name"
          className="phone-number"
          value=""
          placeholder="0878 92844"
          deleteAble
        />
        <Input
          name="name"
          className="phone-number"
          value=""
          placeholder="0878 92844"
          deleteAble
        />
        <Input
          name="name"
          className="phone-number"
          value=""
          placeholder="0878 92844"
          deleteAble
          error="Minimum 8"
        />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </div>
  );
};

export default UpdateContact;

const FormGroup = styled.div`
  margin-top: ${(props: { mt?: string }) => props.mt || "10px"};
  display: flex;
  flex-direction: column;
  gap: 5px;

  ${"& .number-section"} {
    display: flex;
    justify-content: space-between;
  }
  ${"& .phone-number"} {
    margin-bottom: 5px;
  }
`;
