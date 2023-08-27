"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

import useContactListHook, {
  ContactApiResponse,
} from "@/helper/hooks/useContactListHook";

import { Colors, Loading, TextStyle, CardList, Popup } from "@/components/";
import TopContent, { Filter } from "@/components/template/Home/TopContent";

import { setLocalStorage } from "@/helper/utils";
import { PopupProps } from "@/helper/types";

const Home = () => {
  const router = useRouter();
  const { error, loading, favorites, regulars, favIds } = useContactListHook();

  const [favPopup, setFavPopup] = useState(false);
  const [regPopup, setRegPopup] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedContact, setSelectedContact] =
    useState<ContactApiResponse | null>(null);
  const [errorPopup, setErrorPopup] = useState<PopupProps>({
    title: "",
    desc: "",
    open: false,
  });

  const handleClickCard = (contactId: number) => {
    router.push("/contact/" + contactId);
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

  useEffect(() => {
    if (error && !loading) {
      setErrorPopup({ title: error.name, desc: error.message, open: true });
      return;
    }
  }, [error, loading]);

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
                  item={item}
                  onClick={() => handleClickCard(item.id)}
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
                  item={item}
                  onClick={() => handleClickCard(item.id)}
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
      <Popup
        title={errorPopup.title}
        desc={errorPopup.desc}
        open={errorPopup.open}
        handleYesBtn={() => setErrorPopup({ title: "", desc: "", open: false })}
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
