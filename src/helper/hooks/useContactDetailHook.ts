import { ApolloError, useQuery } from "@apollo/client";

import { CONTACT_DETAIL } from "../queries/list";
import { getLocalStorage } from "../utils";
import { ContactApiResponse } from "./useContactListHook";
import { useEffect, useState } from "react";

interface ContactListResponse {
  error?: ApolloError;
  loading: boolean;
  contact: ContactApiResponse | undefined;
  isFavorite: boolean;
}

interface Props {
  contactId: number;
}

const useContactDetailHook = ({ contactId }: Props): ContactListResponse => {
  const { data, error, loading } = useQuery<{
    contact_by_pk: ContactApiResponse;
  }>(CONTACT_DETAIL, { variables: { id: contactId } });
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const favIds = getLocalStorage<number[] | null>("FAVORITE") || [];
    if (data && favIds.includes(data?.contact_by_pk?.id)) {
      setFav(true);
    }
  }, [data]);

  return {
    isFavorite: fav,
    error,
    loading,
    contact: data?.contact_by_pk,
  };
};

export default useContactDetailHook;
