import React, { useContext, useEffect } from "react";
import Contacts from "../../contacts/contacts.component";
import ContactForm from "../../forms/contact-form.component";
import ContactFilter from "../../contacts/contact-filter.component";
import AuthContext from "../../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <ContactForm />
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
