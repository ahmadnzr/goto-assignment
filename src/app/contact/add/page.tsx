"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApolloError, useMutation } from "@apollo/client";

import { Button, Colors, Input, Loading, Popup, TextStyle } from "@/components";
import Navbar from "@/components/template/Navbar";

import { ADD_CONTACT_WITH_PHONE } from "@/helper/queries/create-contact";
import { PopupProps } from "@/helper/types";

type InputField = {
  lastname: string;
  firstname: string;
  [key: string]: string;
};

const AddContact = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<InputField>();
  const [addContact, { loading }] = useMutation(ADD_CONTACT_WITH_PHONE);
  const [errorPopup, setErrorPopup] = useState<PopupProps>({
    title: "",
    desc: "",
    open: false,
  });

  const [phoneField, setPhoneField] = useState([
    {
      id: 1,
      name: "phone-number-1",
    },
  ]);
  const [successPopup, setSuccessPopup] = useState(false);

  const onSubmit: SubmitHandler<InputField> = (data) => {
    const listPhone = Object.keys(data).filter((item) =>
      item.includes("phone-number")
    );
    const currPhoneFieldName = phoneField.map((item) => item.name);
    const phoneToRemove = listPhone.filter(
      (item, i) => !currPhoneFieldName.includes(item)
    );

    const filteredData = Object.keys(data)
      .filter((item) => !phoneToRemove.includes(item))
      .map((key) => ({ [key]: data[key] }));

    const transformToObject: Record<string, string | { number: string }[]> = {};
    const phones: { number: string }[] = [];

    filteredData.forEach((item) => {
      for (const key in item) {
        if (key.startsWith("phone-number-")) {
          phones.push({ number: item[key] });
          transformToObject["phones"] = phones;
        } else {
          transformToObject[key] = item[key];
        }
      }
    });

    addContact({
      variables: {
        first_name: transformToObject.firstname,
        last_name: transformToObject.lastname,
        phones: transformToObject.phones,
      },
    })
      .then(() => {
        setSuccessPopup(true);
      })
      .catch((err: ApolloError) => {
        setErrorPopup({ title: err.name, desc: err.message, open: true });
      });
  };

  return (
    <React.Fragment>
      <Loading loading={loading} />
      <Navbar
        steps={["1", "2"]}
        onClickNavLeft={() => router.push("/")}
        leftTitle
      >
        <TextStyle size="md" weight="bold" color={Colors.PRIMARY_10}>
          Add New Contact
        </TextStyle>
      </Navbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <TextStyle size="sm">Firstname :</TextStyle>
          <Input
            placeholder="John"
            error={errors.firstname}
            fieldName="firstname"
            register={register}
            options={{
              required: true,
              minLength: 3,
              maxLength: 15,
              pattern: /^[a-zA-Z\s]+$/,
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextStyle size="sm">Last Name :</TextStyle>
          <Input
            placeholder="John"
            error={errors.lastname}
            fieldName="lastname"
            register={register}
            options={{
              required: true,
              minLength: 3,
              maxLength: 15,
              pattern: /^[a-zA-Z\s]+$/,
            }}
          />
        </FormGroup>

        <FormGroup>
          <div className="number-section">
            <TextStyle size="sm">Phone Number :</TextStyle>
            <Button
              variant="text"
              onClick={() => {
                const lastId = phoneField[phoneField.length - 1].id;
                setPhoneField([
                  ...phoneField,
                  {
                    id: lastId + 1,
                    name: `phone-number-${lastId + 1}`,
                  },
                ]);
              }}
            >
              Add More Number
            </Button>
          </div>
          {phoneField.map((item, i) => (
            <Input
              key={i}
              error={errors[item.name]}
              className="phone-number"
              placeholder="0878 92844"
              register={register}
              fieldName={item.name}
              deleteAble={i > 0}
              options={{
                required: true,
                minLength: 8,
                maxLength: 15,
                pattern: /^[0-9]*$/,
              }}
              onDeleteField={() => {
                const fields = phoneField.filter((curr) => curr.id !== item.id);
                setValue(item.name, "");
                setPhoneField(fields);
              }}
            />
          ))}
        </FormGroup>
        <FormGroup>
          <Button type="submit">Save</Button>
        </FormGroup>
      </form>
      <Popup
        title={errorPopup.title}
        desc={errorPopup.desc}
        open={errorPopup.open}
        handleYesBtn={() => setErrorPopup({ title: "", desc: "", open: false })}
      />
      <Popup
        title="Contact created successfully"
        open={successPopup}
        handleYesBtn={() => {
          setSuccessPopup(false);
          router.push("/");
        }}
      />
    </React.Fragment>
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
  ${"& .phone-number"} {
    margin-bottom: 5px;
  }
`;
