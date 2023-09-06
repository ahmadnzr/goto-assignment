import { ContactApiResponse } from "@/helper/hooks/useContactListHook";

export const contactListMock = [
  {
    created_at: new Date(),
    first_name: "andi",
    last_name: "jaya",
    id: 1233,
    phones: [],
    isFav: false,
  },
  {
    created_at: new Date(),
    first_name: "ahmad",
    last_name: "nizar",
    id: 1232,
    phones: [],
    isFav: false,
  },
] as ContactApiResponse[];
