import React from 'react';
import {View, Text} from 'react-native';

const ContactDetailsScreen = ({route}) => {
  const {contact} = route.params;

  return (
    <View>
      <Text>{contact.name}</Text>
      <Text>{contact.phone}</Text>
      {/* Add more fields as needed */}
    </View>
  );
};

export default ContactDetailsScreen;
