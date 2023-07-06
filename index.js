import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ContactListScreen from './Showing/ContactListScreen';
import ContactDetailsScreen from './Showing/DetailsOfContacts';
import AllFavoriteContactsScreen from './Showing/AllFavContacts';
import AddContactShowing from './Showing/ConatctSCAdding';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" component={ContactListScreen} />
        <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
        <Stack.Screen
          name="FavoriteContacts"
          component={AllFavoriteContactsScreen}
        />
        <Stack.Screen name="AddContact" component={AddContactShowing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
