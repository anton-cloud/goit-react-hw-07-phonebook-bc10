import React from "react";
import PropTypes from "prop-types";
import { ContactListStyled } from "./ContactListStyled";

const ContactList = ({ visibleContacts, deleteContact }) => {
  return (
    <ContactListStyled>
      {visibleContacts.map(({ name, number, id }) => (
        <li key={id}>
          <div className="wrapper">
            <p className="text">
              {name} {number}
            </p>
            <button type="button" id={id} onClick={deleteContact}>
              delete
            </button>
          </div>
        </li>
      ))}
    </ContactListStyled>
  );
};

ContactList.propTypes = {
  visibleContacts: PropTypes.array,
  deleteContact: PropTypes.func,
};

export default ContactList;
