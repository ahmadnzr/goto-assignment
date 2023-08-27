import { useEffect } from "react";
import { ApolloError, useQuery } from "@apollo/client";

import { getLocalStorage } from "../utils";
import { CONTACT_LIST } from "../queries/list";

export interface ContactApiResponse {
  created_at: Date;
  first_name: string;
  id: number;
  last_name: string;
  phones: { number: string }[];
  isFav?: boolean;
}

interface ContactListResponse {
  error?: ApolloError;
  loading: boolean;
  data: ContactApiResponse[];
  favIds: number[];
}

const useContactListHook = (): ContactListResponse => {
  const { data, error, loading, refetch } = useQuery<{
    contact: ContactApiResponse[];
  }>(CONTACT_LIST);

  const favIds = getLocalStorage<number[] | null>("FAVORITE") || [];

  const contactList = data
    ? data?.contact.map((item) => ({
        ...item,
        isFav: favIds.includes(item.id),
      }))
    : [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    error,
    loading,
    data: contactList,
    favIds,
  };
};

export default useContactListHook;
