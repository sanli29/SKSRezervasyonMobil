import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import GetTopluluk from '../screens/Admin/ToplulukIslemleri/GetTopluluk';
import GetTesis from '../screens/Admin/TesisIslemleri/GetTesis';
import GetPersonel from '../screens/Admin/PersonelIslemleri/GetPersonel';
import GetRezervasyon from '../screens/Admin/RezervasyonIslemleri/GetRezervasyon';
import Logout from '../screens/Logout';

export default function AdminNavigation({route}) {
  const Drawer = createDrawerNavigator();
  const {token} = route.params;
  return (
    <Drawer.Navigator initialRouteName="AdminDashboard">
      <Drawer.Screen
        name="Topluluk Islemleri"
        component={GetTopluluk}
        initialParams={{token: token, role: 'sksadmin'}}
      />
      <Drawer.Screen
        name="Tesis Islemleri"
        component={GetTesis}
        initialParams={{token: token, role: 'sksadmin'}}
      />
      <Drawer.Screen
        name="Rezervasyon Islemleri"
        component={GetRezervasyon}
        initialParams={{token: token, role: 'sksadmin'}}
      />
      <Drawer.Screen
        name="Personel Islemleri"
        component={GetPersonel}
        initialParams={{token: token, role: 'sksadmin'}}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        initialParams={{token: token, role: 'sksadmin'}}
      />
    </Drawer.Navigator>
  );
}
