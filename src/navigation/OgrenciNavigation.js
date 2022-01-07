import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RezervasyonYap from '../screens/Rezervasyon/RezervasyonYap';
import ToplulukKatılma from '../screens/Ogrenci/ToplulukIslemleri/ToplulukKatılma';
import Logout from '../screens/Logout';
import Rezervasyonlarım from '../screens/Rezervasyon/Rezervasyonlarım';

export default function OgrenciNavigation({route}) {
  const Drawer = createDrawerNavigator();
  const {token} = route.params;
  return (
    <Drawer.Navigator initialRouteName="OgrenciDashboard">
      <Drawer.Screen
        name="Rezervasyon Yap"
        component={RezervasyonYap}
        initialParams={{token: token, role: 'student'}}
      />
      <Drawer.Screen
        name="Rezervasyonlarım"
        component={Rezervasyonlarım}
        initialParams={{token: token, role: 'student'}}
      />
      <Drawer.Screen
        name="Topluluğa Katılma"
        component={ToplulukKatılma}
        initialParams={{token: token, role: 'student'}}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        initialParams={{token: token, role: 'student'}}
      />
    </Drawer.Navigator>
  );
}
