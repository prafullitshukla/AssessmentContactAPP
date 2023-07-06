import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddContactShowing = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);

  const choosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.errorCode) {
        setPhoto(response.uri);
      }
    });
  };

  const saveContact = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@contacts');
      const storedContacts = jsonValue != null ? JSON.parse(jsonValue) : [];
      const newContact = {
        id: storedContacts.length + 1,
        name,
        phone,
        photo,
      };
      storedContacts.push(newContact);
      await AsyncStorage.setItem('@contacts', JSON.stringify(storedContacts));
      navigation.goBack();
    } catch (e) {
      console.error('Failed to save contact to storage.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <Button title="Choose Photo" onPress={choosePhoto} />
      <Button title="Save" onPress={saveContact} />
    </View>
  );
};

export default AddContactShowing;
