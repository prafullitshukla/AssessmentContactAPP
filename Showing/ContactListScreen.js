import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'contacts.db'});

const ContactListScreen = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    createContactsTable();
    loadContacts();
  }, []);

  const createContactsTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT);',
        [],
        () => console.log('Contacts table created successfully.'),
        (_, error) => console.error('Error creating contacts table:', error),
      );
    });
  };

  const loadContacts = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts;',
        [],
        (_, {rows}) => setContacts(rows._array),
        (_, error) => console.error('Error loading contacts:', error),
      );
    });
  };

  const renderContactItem = ({item}) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.phone}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ContactListScreen;
