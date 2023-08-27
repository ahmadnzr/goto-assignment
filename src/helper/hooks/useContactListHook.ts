import { ApolloError, useQuery } from "@apollo/client";
import { CONTACT_LIST } from "../queries/list";
import { getLocalStorage } from "../utils";
import { useContext, useEffect } from "react";
import { AppContext } from "@/container/AppContainer";

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
  const { setGlobalError, globalError } = useContext(AppContext);
  const { data, error, loading } = useQuery<{ contact: ContactApiResponse[] }>(
    CONTACT_LIST
  );

  const favIds = getLocalStorage<number[] | null>("FAVORITE") || [];

  const favorites = data
    ? data?.contact?.filter((item) => favIds?.includes(item.id))
    : [];
  const regulars = data
    ? data?.contact?.filter((item) => !favIds?.includes(item.id))
    : [];

  useEffect(() => {
    // setGlobar error when error from query
    if (error && !loading && !globalError?.isError) {
      setGlobalError({ title: error.name, desc: error.message, isError: true });
      return;
    }
  }, [error, globalError?.isError, setGlobalError, loading]);

  useEffect(() => {
    // setGlobal error to false when success request is success
    if (!error && !loading && globalError?.isError) {
      setGlobalError({ title: "", desc: "", isError: false });
    }
  }, [error, globalError?.isError, loading, setGlobalError]);

  return {
    error,
    loading,
    favorites,
    regulars,
    favIds,
  };
};

export default useContactListHook;
