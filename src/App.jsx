import './App.css';
import { useState } from 'react';
import contactsJson from './contacts.json';

function App() {
  const initialContacts = contactsJson.slice(0, 5);
  const [contacts, setContacts] = useState(initialContacts);
  const remainingContacts = contactsJson.filter(
    contact => !contacts.includes(contact)
  );

  const addRandomContact = () => {
    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      const randomContact = remainingContacts[randomIndex];
      setContacts(contacts => [...contacts, randomContact]);
    } else {
      alert('No more contacts to add!');
    }
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contacts];
    sortedContacts.sort((a, b) => b.popularity - a.popularity);
    setContacts(sortedContacts);
  };

  const sortByName = () => {
    const sortedContacts = [...contacts];
    sortedContacts.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sortedContacts);
  };

  const handleDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>
              <b>Picture</b>
            </th>
            <th>
              <b>Name</b>
            </th>
            <th>
              <b>Popularity</b>
            </th>
            <th>
              <b>Won an Oscar</b>
            </th>
            <th>
              <b>Won an Emmy</b>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>
                {' '}
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  width={150}
                  height={150}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar && '🏆'}</td>
              <td>{contact.wonEmmy && '🌟'}</td>
              <td>
                <button onClick={() => handleDeleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
