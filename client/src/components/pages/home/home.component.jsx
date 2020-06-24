import React from "react";
import Contacts from "../../contacts/contacts.component";
import ContactForm from "../../forms/contact-form.component";
import ContactFilter from "../../contacts/contact-filter.component";

const Home = () => {
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
