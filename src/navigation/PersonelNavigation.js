import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RezervasyonYap from '../screens/Rezervasyon/RezervasyonYap';
import Logout from '../screens/Logout';
import Rezervasyonlarım from '../screens/Rezervasyon/Rezervasyonlarım';

export default function PersonelNavigation({route}) {
  const Drawer = createDrawerNavigator();
  const {token} = route.params;
  return (
    <Drawer.Navigator initialRouteName="PersonelDashboard">
      <Drawer.Screen
        name="Rezervasyon Yap"
        component={RezervasyonYap}
        initialParams={{token: token, role: 'academical'}}
      />
      <Drawer.Screen
        name="Rezervasyonlarım"
        component={Rezervasyonlarım}
        initialParams={{token: token, role: 'academical'}}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        initialParams={{token: token, role: 'academical'}}
      />
    </Drawer.Navigator>
  );
}
