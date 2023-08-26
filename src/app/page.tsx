"use client";
import React from "react";
import styled from "@emotion/styled";

import { Colors, InputSearch, TextStyle } from "@/components/atoms";
import { CardList } from "@/components/molecules";
import { useRouter } from "next/navigation";
import TopContent from "@/components/template/Home/TopContent";

const Home = () => {
  const router = useRouter();
  const handleClickCard = () => {
    router.push("/contact/2");
  };
  return (
    <div>
      <TopContent />
      <ListContainer>
        <GroupContact>
          <TextStyle
            className="group-title"
            size="xs"
            color={Colors.NEUTRAL_40}
          >
            Favorite Contacts
          </TextStyle>

          <ContactList>
            {Array.from(Array(3).keys()).map((item, i) => (
              <CardList
                key={i}
                isFavorite
                onClick={handleClickCard}
                onClickFav={() => {
                  console.log("ok");
                }}
              />
            ))}
          </ContactList>
        </GroupContact>
        <GroupContact>
          <TextStyle
            className="group-title"
            size="xs"
            color={Colors.NEUTRAL_40}
          >
            Regular Contacts
          </TextStyle>
          <ContactList>
            {Array.from(Array(15).keys()).map((item, i) => (
              <CardList
                key={i}
                isFavorite={false}
                onClick={handleClickCard}
                onClickFav={() => {}}
              />
            ))}
          </ContactList>
        </GroupContact>
      </ListContainer>
    </div>
  );
};

export default Home;

const ListContainer = styled.div`
  margin-top: var(--floating-top-home);
  padding: 5px 0;
`;

const ContactList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px 0;
`;

const GroupContact = styled.div({
  marginTop: "20px",

  "& .group-title": {
    marginBottom: "10px",
  },
});
