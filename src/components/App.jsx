import { Component } from 'react';
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

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem(LS_CONTACT_LIST));

    localContacts &&
      this.setState({
        contacts: localContacts,
      });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        LS_CONTACT_LIST,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleFromSubmit = currentContact => {
    const isContactNameAlreadyExists = this.state.contacts.find(
      ({ name }) =>
        name.toLowerCase().trim() === currentContact.name.toLowerCase().trim()
    );

    if (isContactNameAlreadyExists) {
      Notify.failure('Contact with this name already exist');
      return;
    }

    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...currentContact }, ...prevState.contacts],
    }));
  };

  handleFilterInputChange = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  updateFilteredList = () => {
    const { contacts, filter } = this.state;
    const validFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(validFilter)
    );
  };

  handleDeleteButtonClick = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    return (
      <>
        <Global styles={GlobalStyles} />
        <Container>
          <ThemeProvider theme={theme}>
            <div>
              <Title>Phonebook</Title>
              <ContactForm onSubmit={this.handleFromSubmit} />
            </div>
            <div>
              <ContactsTitle>Contacts</ContactsTitle>
              <Filter
                value={this.state.filter}
                onChange={this.handleFilterInputChange}
              />
              {this.updateFilteredList().length === 0 ? (
                <InfoTitle>The contact list is empty</InfoTitle>
              ) : (
                <ContactList
                  contacts={this.updateFilteredList()}
                  onDeleteButtonClick={this.handleDeleteButtonClick}
                />
              )}
            </div>
          </ThemeProvider>
        </Container>
      </>
    );
  }
}
