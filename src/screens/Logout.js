import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../components/Api/Api';

export default function Logout({route}) {
  const navigation = useNavigation();
  const {token, role} = route.params;

  function LogoutRequest() {
    api
      .api()
      .get(`/${role}/logout`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        if (res.data.status) {
          navigation.navigate('Login');
        } else {
          alert(res.data.message);
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }
  LogoutRequest();

  return <View></View>;
}
