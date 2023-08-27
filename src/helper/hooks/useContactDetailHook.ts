import { ApolloError, useQuery } from "@apollo/client";
import { CONTACT_DETAIL, CONTACT_LIST } from "../queries/list";
import { getLocalStorage } from "../utils";
import { useContext, useEffect } from "react";
import { AppContext } from "@/container/AppContainer";
import { ContactApiResponse } from "./useContactListHook";

interface ContactListResponse {
  error?: ApolloError;
  loading: boolean;
  contact: ContactApiResponse | undefined;
}

interface Props {
  contactId: number;
}

const useContactDetailHook = ({ contactId }: Props): ContactListResponse => {
  const { setGlobalError, globalError } = useContext(AppContext);
  const { data, error, loading } = useQuery<{
    contact_by_pk: ContactApiResponse;
  }>(CONTACT_DETAIL, { variables: { id: contactId } });

  const favIds = getLocalStorage<number[] | null>("FAVORITE") || [];

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
    contact: data?.contact_by_pk,
  };
};

export default useContactDetailHook;
