import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Text, View} from 'react-native';
import {Button, Modal, FormControl, Input} from 'native-base';
import api from '../../../components/Api/Api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GetRezervasyon({route}) {
  const {token, role} = route.params;
  const [rezervasyonlar, setRezervasyonlar] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    RezervasonListele();
  }, [refresh]);

  function RezervasonListele() {
    api
      .api()
      .get(`/${role}/reservation`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        if (res.data.status) {
          setRezervasyonlar(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch(function (err) {
        alert(err);
        switch (err.response.status) {
          case 401:
            navigation.navigate('Login');
          default:
            break;
        }
      });
  }

  function RezervasyonDelete(parametreId) {
    api
      .api()
      .delete(`/${role}/reservation/${parametreId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        if (res.data.status) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch(function (err) {
        alert(err);
        console.log(err.response.status);
      });
    setRefresh(!refresh);
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={rezervasyonlar}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: 20,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                marginBottom: 20,
                backgroundColor: '#F9A041',
                borderRadius: 12,
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <Icon
                  name="trash"
                  color="black"
                  size={35}
                  onPress={() => {
                    RezervasyonDelete(item.id);
                    setRefresh(!refresh);
                  }}
                />
              </View>
              <View style={{paddingLeft: 20, alignItems: 'flex-start'}}>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.reservastionDate}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>
                  {'Tesis Adı : ' + item.facility.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.8}}>
                  {item.studentId === null
                    ? 'PERSONEL :  ' +
                      item.academical_personal.name +
                      ' ' +
                      item.academical_personal.surname
                    : 'OGRENCI :  ' +
                      item.student.name +
                      ' ' +
                      item.student.surname}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
