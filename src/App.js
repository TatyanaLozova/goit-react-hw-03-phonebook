import React, { Component } from 'react';
 import { v4 as uuidv4 } from 'uuid';
import ContactForm from './Components/ContactForm/ContactForm'
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter'


import './App.css';


class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount () {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts))
    }
    
  }
      
  

  // добавляем контакт
  addContact = ({name, number}) => {
    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts!`);
      return;
    } else {
      this.setState((prevState) => ({
          contacts: [contact, ...prevState.contacts],
      }));
    }
  };
   // удаляет контакты
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
// Фильтр 
     changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
    };
  
  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };
  
  render() {
    const {
      addContact,
      changeFilter,
      filterContacts,
      deleteContact,
     
    } = this;
    
    const getFilterContacts = filterContacts()

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h1>Contacts</h1>
        <Filter
          filter={this.state.filter}
          onChangeFilter={changeFilter}
        />
        <ContactList
          contacts={getFilterContacts}
        onDeleteContact={deleteContact}/>
      </div>
    );
  }
}


export default App;
