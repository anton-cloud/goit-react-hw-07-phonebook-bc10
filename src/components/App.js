import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import contactsActions from "../redux/contacts/contactsActions";
import contactsOperations from "../redux/contacts/contactsOperations";
import contactsSelectors from "../redux/contacts/contactsSelectors";
import ContactForm from "./contactForm/ContactForm";
import ContactList from "./contactList/ContactList";
import Filter from "./filter/Filter";
import Section from "./section/Section";

// const contactsValue = JSON.parse(window.localStorage.getItem("contacts")) || [
//   { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//   { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//   { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//   { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
// ];

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => contactsSelectors.getContacts(state));
  const filter = useSelector((state) => contactsSelectors.getFilter(state));

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  // ================for ContactForm==========================
  const onSubmit = (contact) => {
    contacts.some(
      (item) =>
        item.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
    )
      ? alert(`${contact.name} is already in contacts.`)
      : dispatch(contactsOperations.addContact(contact));
  };

  // ================for ContactList==========================
  const visibleContacts = useSelector((state) =>
    contactsSelectors.getVisibleContacts(state)
  );
  const deleteContact = (e) =>
    dispatch(contactsOperations.deleteContact(e.target.id));

  // ================for Filter===============================
  const onChangeFilter = (e) => {
    const { value } = e.target;
    dispatch(contactsActions.changeFilter(value));
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={onSubmit} />
      </Section>

      <Section title="Contacts">
        <Filter onChangeFilter={onChangeFilter} filter={filter} />
        <ContactList
          visibleContacts={visibleContacts}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
};

export default App;
