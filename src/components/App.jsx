import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';
import { Global } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange, lime } from '@mui/material/colors';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { GlobalStyles } from 'css/GlobalStyles';
import { Container, Title, ContactsTitle, InfoTitle } from './Container.styled';

const LS_CONTACT_LIST = 'contact-list';
const theme = createTheme({
  palette: {
    primary: orange,
    secondary: lime,
  },
});

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_CONTACT_LIST)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_CONTACT_LIST, JSON.stringify(contacts));
  }, [contacts]);

  const handleFromSubmit = currentContact => {
    const isContactNameAlreadyExists = contacts.find(
      ({ name }) =>
        name.toLowerCase().trim() === currentContact.name.toLowerCase().trim()
    );

    if (isContactNameAlreadyExists) {
      Notify.failure('Contact with this name already exist');
      return;
    }

    setContacts(prevContacts => [
      { id: nanoid(), ...currentContact },
      ...prevContacts,
    ]);
  };

  const handleFilterInputChange = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const updateFilteredList = () => {
    const validFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(validFilter)
    );
  };

  const handleDeleteButtonClick = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  return (
    <>
      <Global styles={GlobalStyles} />
      <Container>
        <ThemeProvider theme={theme}>
          <div>
            <Title>Phonebook</Title>
            <ContactForm onSubmit={handleFromSubmit} />
          </div>
          <div>
            <ContactsTitle>Contacts</ContactsTitle>
            <Filter value={filter} onChange={handleFilterInputChange} />
            {updateFilteredList().length === 0 ? (
              <InfoTitle>The contact list is empty</InfoTitle>
            ) : (
              <ContactList
                contacts={updateFilteredList()}
                onDeleteButtonClick={handleDeleteButtonClick}
              />
            )}
          </div>
        </ThemeProvider>
      </Container>
    </>
  );
};
