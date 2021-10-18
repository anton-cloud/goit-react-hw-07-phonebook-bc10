import axios from "axios";
import actions from "./contactsActions";
const baseUrl = "http://localhost:3001";

const fetchContacts = () => async (dispatch) => {
  dispatch(actions.fetchContactsRequest);
  try {
    const result = await axios.get(`${baseUrl}/contacts`);
    dispatch(actions.fetchContactsSuccess(result.data));
  } catch (error) {
    dispatch(actions.fetchContactsError(error));
  }
};

const addContact = (contact) => async (dispatch) => {
  dispatch(actions.addContactRequest());
  try {
    const result = await axios.post(`${baseUrl}/contacts`, contact);
    dispatch(actions.addContactSuccess(result.data));
  } catch (error) {
    dispatch(actions.addContactError(error));
  }
};

const deleteContact = (id) => async (dispatch) => {
  dispatch(actions.deleteContactRequest());
  try {
    await axios.delete(`${baseUrl}/contacts/${id}`);
    dispatch(actions.deleteContactSuccess(id));
  } catch (error) {
    dispatch(actions.deleteContactError(error));
  }
};

export default { addContact, deleteContact, fetchContacts };
