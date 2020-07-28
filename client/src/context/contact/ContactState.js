import React, { useReducer } from "react";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  CONTACT_ERROR,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const { children } = props;
  const { contacts, current, filtered, error } = state;

  // get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message,
      });
    }
  };

  // add contact
  const addContact = async (contact) => {
    // contact.id = uuidv4();  // generated a dummy id

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message,
      });
    }
  };

  // delete contact
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message,
      });
    }
  };

  // update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message,
      });
    }
  };

  // clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // clear contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // filter contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // clear filter contacts
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: contacts,
        addContact,
        deleteContact,
        getContacts,
        current: current,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
        filtered: filtered,
        error,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
