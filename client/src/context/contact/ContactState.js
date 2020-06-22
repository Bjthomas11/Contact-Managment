import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initalState = {
    contacts: [
      {
        id: 1,
        name: "Brian Thomas",
        email: "brian@gmail.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Brian 2nd",
        email: "brian2nd@gmail.com",
        phone: "111-111-1111",
        type: "professional",
      },
    ],
  };
  const [state, dispatch] = useReducer(contactReducer, initalState);
  const { children } = props;
  const { contacts } = state;

  // add contact

  // delete contact

  // set current contact

  // clear contact

  // update contact

  // filter contacts

  // clear filter contacts

  return (
    <ContactContext.Provider
      value={{
        contacts: contacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
