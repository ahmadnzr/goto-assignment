"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Colors, Loading, TextStyle } from "@/components/atoms";
import { CardList } from "@/components/molecules";
import { useRouter } from "next/navigation";
import TopContent, { Filter } from "@/components/template/Home/TopContent";
import useContactListHook, {
  ContactApiResponse,
} from "@/helper/hooks/useContactListHook";
import Popup from "@/components/molecules/Popup";
import { getLocalStorage, setLocalStorage } from "@/helper/utils";

const Home = () => {
  const router = useRouter();
  const { error, loading, favorites, regulars, favIds } = useContactListHook();

  const [favPopup, setFavPopup] = useState(false);
  const [regPopup, setRegPopup] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedContact, setSelectedContact] =
    useState<ContactApiResponse | null>(null);

  const handleClickCard = () => {
    router.push("/contact/2");
  };

  const handleSetFav = () => {
    try {
      setLocalStorage("FAVORITE", [...favIds, selectedContact?.id]);

      router.refresh();
      setRegPopup(false);
    } catch (error) {}
  };

  const handleSetRegular = () => {
    try {
      const favorites = favIds.filter((item) => item !== selectedContact?.id);
      setLocalStorage("FAVORITE", favorites);
      setFavPopup(false);
    } catch (error) {}
  };

  // console.log(loading, error);

  return (
    <React.Fragment>
      <Loading loading={loading} />
      <TopContent filter={filter} setFilter={setFilter} />
      <ListContainer>
        {favorites.length && ["all", "fav"].includes(filter) ? (
          <GroupContact>
            <TextStyle
              className="group-title"
              size="xs"
              color={Colors.NEUTRAL_40}
            >
              Favorite Contacts
            </TextStyle>

            <ContactList>
              {favorites.map((item, i) => (
                <CardList
                  key={i}
                  isFavorite
                  item={{
                    label: item.first_name,
                    subLabel: item?.phones[0]?.number,
                  }}
                  onClick={handleClickCard}
                  onClickFav={() => {
                    setFavPopup(true);
                    setSelectedContact(item);
                  }}
                />
              ))}
            </ContactList>
          </GroupContact>
        ) : null}
        {regulars.length && ["all", "reg"].includes(filter) ? (
          <GroupContact>
            <TextStyle
              className="group-title"
              size="xs"
              color={Colors.NEUTRAL_40}
            >
              Regular Contacts
            </TextStyle>
            <ContactList>
              {regulars.map((item, i) => (
                <CardList
                  key={i}
                  item={{
                    label: item.first_name,
                    subLabel: item.phones[0]?.number,
                  }}
                  onClick={handleClickCard}
                  onClickFav={() => {
                    setRegPopup(true);
                    setSelectedContact(item);
                  }}
                />
              ))}
            </ContactList>
          </GroupContact>
        ) : null}
      </ListContainer>
      <Popup
        title="Remove this contact from favorites ?"
        desc="The contact will be marked as a regular contact."
        open={favPopup}
        type="action"
        handleCloseBtn={() => setFavPopup(false)}
        handleYesBtn={handleSetRegular}
      />
      <Popup
        title="Contact added successfully"
        open={regPopup}
        handleCloseBtn={() => setFavPopup(false)}
        handleYesBtn={handleSetFav}
      />
    </React.Fragment>
  );
};

export default Home;

const ListContainer = styled.div`
  margin-top: var(--floating-top-home);
  padding: 5px 0;
`;

const EmptyContact = styled.div`
  margin-top: var(--floating-top-home);
  background-color: red;
  height: 100%;
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
