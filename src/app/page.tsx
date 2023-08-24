"use client";
import React from "react";
import styled from "@emotion/styled";

import { Colors, InputSearch, TextStyle } from "@/components/atoms";
import { CardList } from "@/components/molecules";

const Home = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <InputSearch />
      <GroupContact>
        <TextStyle className="group-title" size="xs" color={Colors.NEUTRAL_40}>
          Favorite Contacts
        </TextStyle>
        <ContactList>
          {Array.from(Array(3).keys()).map((item, i) => (
            <CardList key={i} isFavorite />
          ))}
        </ContactList>
      </GroupContact>
      <GroupContact>
        <TextStyle className="group-title" size="xs" color={Colors.NEUTRAL_40}>
          Regular Contacts
        </TextStyle>
        <ContactList>
          {Array.from(Array(15).keys()).map((item, i) => (
            <CardList key={i} isFavorite={false} />
          ))}
        </ContactList>
      </GroupContact>
    </div>
  );
};

export default Home;

const ContactList = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "15px 0",
});

const GroupContact = styled.div({
  marginTop: "30px",

  "& .group-title": {
    marginBottom: "10px",
  },
});
