"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField, PopupProps } from "@/helper/types";
import { ApolloError, useMutation } from "@apollo/client";

import { Button, Colors, Input, Loading, TextStyle } from "@/components/atoms";
import Navbar from "@/components/template/Navbar";
import { Popup } from "@/components";
import {
  EDIT_CONTACT_BY_ID,
  EDIT_PHONE_NUMBER,
} from "@/helper/queries/edit-contact";
import useContactDetailHook from "@/helper/hooks/useContactDetailHook";
import { ADD_NUMBER_TO_CONTACT } from "@/helper/queries/create-contact";

const UpdateContact = ({ params }: { params: { contactId: string } }) => {
  const router = useRouter();

  const [updateContact, { loading: loadingEdit1 }] =
    useMutation(EDIT_CONTACT_BY_ID);
  const [editPhoneNumber, { loading: loadingEdit2 }] =
    useMutation(EDIT_PHONE_NUMBER);
  const [addNumberToContact, { loading: loadingAdd }] = useMutation(
    ADD_NUMBER_TO_CONTACT
  );

  const {
    loading: loadingDetail,
    error: errDetail,
    contact,
  } = useContactDetailHook({ contactId: parseInt(params.contactId) });

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    setValue,
    reset,
  } = useForm<InputField>({
    defaultValues: async () => {
      return {
        firstname: contact?.first_name || "",
        lastname: contact?.last_name || "",
      };
    },
  });

  const [errorPopup, setErrorPopup] = useState<PopupProps>({
    title: "",
    desc: "",
    open: false,
  });
  const [phoneField, setPhoneField] = useState<
    {
      id: number;
      name: string;
      value: string;
      isDeleteAble?: boolean;
      isUpdated?: boolean;
    }[]
  >([
    {
      id: 1,
      name: "phone-number-1",
      value: "",
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
    const phoneNumbers = contact?.phones.map((item) => item) || [];
    const phonesField = phones.map((item) => item);

    const phoneToEdit = phonesField
      .slice(0, phoneNumbers.length)
      .map((item, i) => ({ old: phoneNumbers[i].number, new: item.number }))
      .filter((item) => item.new !== item.old);
    const phoneToAdd = phones.slice(phoneNumbers.length, phonesField.length);

    console.log(phoneToAdd, phoneToEdit);

    Promise.all([
      updateContact({
        variables: {
          id: contact?.id,
          _set: {
            first_name: transformToObject.firstname,
            last_name: transformToObject.lastname,
          },
        },
      }),
      ...phoneToAdd.map((item) => {
        addNumberToContact({
          variables: { contact_id: contact?.id, phone_number: item.number },
        });
      }),
      ...phoneToEdit.map((item, i) =>
        editPhoneNumber({
          variables: {
            pk_columns: {
              number: item.old,
              contact_id: contact?.id,
            },
            new_phone_number: item.new,
          },
        })
      ),
    ])
      .then(() => {
        setSuccessPopup(true);
      })
      .catch((err: ApolloError) => {
        setErrorPopup({ title: err.name, desc: err.message, open: true });
      });
  };

  const setPhoneFields = (phones: { number: string }[] | []) => {
    const phoneFields = phones.map((item, i) => ({
      id: i,
      name: `phone-number-${i}`,
      value: item.number,
    }));
    setPhoneField(phoneFields);
  };

  useEffect(() => {
    if (contact) {
      setPhoneFields(contact.phones);
    }
  }, [contact]);

  useEffect(() => {
    if (errDetail && !loadingDetail) {
      setErrorPopup({
        title: errDetail.name,
        desc: errDetail.message,
        open: true,
      });
      return;
    }
  }, [errDetail, loadingDetail]);

  return (
    <React.Fragment>
      <Loading
        loading={loadingEdit1 || loadingEdit2 || loadingAdd || loadingDetail}
      />
      <Navbar
        steps={["1", "2"]}
        onClickNavLeft={() => router.push("/")}
        leftTitle
      >
        <TextStyle size="md" weight="bold" color={Colors.PRIMARY_10}>
          Update Contact
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
            defaultValue={contact?.first_name}
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
            defaultValue={contact?.last_name || ""}
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
                const lastId = phoneField[phoneField.length - 1]?.id;
                setPhoneField([
                  ...phoneField,
                  {
                    id: lastId ? lastId + 1 : 0,
                    name: `phone-number-${lastId + 1}`,
                    value: "",
                    isDeleteAble: true,
                  },
                ]);
              }}
            >
              Add More Number
            </Button>
          </div>
          {phoneField?.map((item, i) => (
            <Input
              key={i}
              error={errors[item.name]}
              className="phone-number"
              placeholder="0878 92844"
              register={register}
              defaultValue={item.value}
              fieldName={item.name}
              options={{
                required: true,
                minLength: 8,
                maxLength: 15,
                pattern: /^[0-9]*$/,
              }}
              deleteAble={item.isDeleteAble}
              onDeleteField={() => {
                const fields = phoneField.filter((curr) => curr.id !== item.id);
                setValue(item.name, "");
                setPhoneField(fields);
              }}
            />
          ))}
        </FormGroup>
        <FormGroup direction="row" gap="30px">
          <Button type="submit" disabled={!isDirty}>
            Save
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setPhoneFields(contact?.phones || []);
              reset();
            }}
            disabled={!isDirty}
          >
            Reset
          </Button>
        </FormGroup>
      </form>
      <Popup
        title={errorPopup.title}
        desc={errorPopup.desc}
        open={errorPopup.open}
        handleYesBtn={() => setErrorPopup({ title: "", desc: "", open: false })}
      />
      <Popup
        title="Contact updated successfully"
        open={successPopup}
        handleYesBtn={() => {
          setSuccessPopup(false);
          router.push("/");
        }}
      />
    </React.Fragment>
  );
};

export default UpdateContact;

const FormGroup = styled.div`
  margin-top: ${(props: { mt?: string }) => props.mt || "10px"};
  display: flex;
  flex-direction: ${({
    direction = "column",
  }: {
    mt?: string;
    direction?: "row" | "column";
  }) => direction};
  gap: ${({
    gap = "5px",
  }: {
    mt?: string;
    direction?: "row" | "column";
    gap?: string;
  }) => gap};

  ${"& .number-section"} {
    display: flex;
    justify-content: space-between;
  }
  ${"& .phone-number"} {
    margin-bottom: 5px;
  }
`;
