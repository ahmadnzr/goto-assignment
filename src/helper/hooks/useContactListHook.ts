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
}

interface ContactListResponse {
  error?: ApolloError;
  loading: boolean;
  favorites: ContactApiResponse[] | [];
  regulars: ContactApiResponse[] | [];
  favIds: number[];
}

const useContactListHook = (): ContactListResponse => {
  const { data, error, loading, refetch } = useQuery<{
    contact: ContactApiResponse[];
  }>(CONTACT_LIST);

  const favIds = getLocalStorage<number[] | null>("FAVORITE") || [];

  const favorites = data
    ? data?.contact?.filter((item) => favIds?.includes(item.id))
    : [];
  const regulars = data
    ? data?.contact?.filter((item) => !favIds?.includes(item.id))
    : [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    error,
    loading,
    favorites,
    regulars,
    favIds,
  };
};

export default useContactListHook;
