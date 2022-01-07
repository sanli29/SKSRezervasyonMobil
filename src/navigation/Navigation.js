import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import AdminNavigation from './AdminNavigation';
import OgrenciNavigation from './OgrenciNavigation';
import PersonelNavigation from './PersonelNavigation';
import HomePage from '../screens/HomePage';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="sksadmin" component={AdminNavigation} />
        <Stack.Screen name="student" component={OgrenciNavigation} />
        <Stack.Screen name="academical" component={PersonelNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
