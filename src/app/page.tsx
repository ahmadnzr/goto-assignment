"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

import useContactListHook, {
  ContactApiResponse,
} from "@/helper/hooks/useContactListHook";

import { Colors, Loading, TextStyle, CardList, Popup } from "@/components/";
import TopContent, { Filter } from "@/components/template/Home/TopContent";

import { getLocalStorage, setLocalStorage } from "@/helper/utils";
import { PopupProps } from "@/helper/types";
import Pagination from "@/components/molecules/Pagination";
import { useLazyQuery } from "@apollo/client";
import { CONTACT_LIST } from "@/helper/queries/list";
import useDebounce from "@/helper/hooks/useDebounce";

const Home = () => {
  const router = useRouter();

  const { error, loading, data, favIds } = useContactListHook();
  const [
    searchContact,
    { data: dataSearch, loading: loadingSearch, error: errSearch },
  ] = useLazyQuery<{ contact: ContactApiResponse[] }>(CONTACT_LIST, {
    fetchPolicy: "no-cache",
  });

  const [favPopup, setFavPopup] = useState(false);
  const [regPopup, setRegPopup] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] =
    useState<ContactApiResponse | null>(null);
  const [errorPopup, setErrorPopup] = useState<PopupProps>({
    title: "",
    desc: "",
    open: false,
  });
  const [contactListData, setContactListData] = useState<ContactApiResponse[]>(
    []
  );

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const contactList =
    search !== ""
      ? contactListData
      : data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

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

  const handleSetFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearch(search);
  };

  useEffect(() => {
    if (error && !loading) {
      setErrorPopup({ title: error.name, desc: error.message, open: true });
      return;
    }
  }, [error, loading]);

  useDebounce(
    () => {
      searchContact({
        variables: {
          where: {
            first_name: {
              _like: `%${search}%`,
            },
          },
        },
      });
    },
    [search],
    300
  );

  useEffect(() => {
    if (search !== "") {
      setContactListData(dataSearch?.contact || []);
    }
  }, [dataSearch, search]);

  return (
    <React.Fragment>
      <Loading loading={loading || loadingSearch} />
      <TopContent
        filter={filter}
        setFilter={handleSetFilter}
        onChange={handleSearch}
        search={search}
        onReset={() => {
          setSearch("");
        }}
      />
      <ListContainer>
        {contactList?.filter((item) => item.isFav).length &&
        ["all", "fav"].includes(filter) ? (
          <GroupContact>
            <TextStyle
              className="group-title"
              size="xs"
              color={Colors.NEUTRAL_40}
            >
              Favorite Contacts
            </TextStyle>

            <ContactList>
              {contactList
                ?.filter((item) => item.isFav)
                ?.map((item, i) => (
                  <CardList
                    key={i}
                    isFavorite={item.isFav}
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
        {contactList?.filter((item) => !item.isFav).length &&
        ["all", "reg"].includes(filter) ? (
          <GroupContact>
            <TextStyle
              className="group-title"
              size="xs"
              color={Colors.NEUTRAL_40}
            >
              Regular Contacts
            </TextStyle>
            <ContactList>
              {contactList
                ?.filter((item) => !item.isFav)
                ?.map((item, i) => (
                  <CardList
                    key={i}
                    item={item}
                    isFavorite={item.isFav}
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

        {contactList.length ? (
          <PaginationContainer>
            <Pagination
              totalData={data?.length || 0}
              currentPage={page}
              rowPerPage={rowsPerPage}
              onClickPage={(id) => {
                setPage(id);
              }}
            />
          </PaginationContainer>
        ) : null}

        {contactList.length === 0 ? (
          <EmptyContact>
            <TextStyle size="md" weight="semibold" color={Colors.NEUTRAL_40}>
              Contact Empty
            </TextStyle>
          </EmptyContact>
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
  padding: 5px 0;
`;

const EmptyContact = styled.div`
  height: 100%;
  text-align: center;
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

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 10px 12px;
`;
