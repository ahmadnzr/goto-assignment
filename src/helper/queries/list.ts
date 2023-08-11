import { gql } from "@apollo/client";

const CONTACT_LIST = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

const CONTACT_DETAIL = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      last_name
      id
      first_name
      created_at
      phones {
        number
      }
    }
  }
`;

const PHONE_LIST = gql`
  query GetPhoneList(
    $where: phone_bool_exp
    $distinct_on: [phone_select_column!]
    $limit: Int = 10
    $offset: Int = 0
    $order_by: [phone_order_by!]
  ) {
    phone(
      where: $where
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      contact {
        last_name
        first_name
        id
      }
      number
    }
  }
`;

export { CONTACT_LIST, CONTACT_DETAIL, PHONE_LIST };
