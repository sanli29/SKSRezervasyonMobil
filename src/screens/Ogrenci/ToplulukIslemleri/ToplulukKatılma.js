import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../components/Api/Api';

export default function ToplulukKatılma({route}) {
  const {token, role} = route.params;
  const [topluluklar, setTopluluklar] = useState([]);

  useEffect(() => {
    ToplulukListele();
  }, []);

  function ToplulukListele() {
    api
      .api()
      .get(`/${role}/getcommunity`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        if (res.data.status) {
          setTopluluklar(res.data.data);
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

  function TopluklukJoin(id) {
    api
      .api()
      .post(
        `/${role}/joincommunity`,
        {communityId: id},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (res) {
        if (res.data.status) {
          alert(res.data.message);
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

  return (
    <View>
      <FlatList
        data={topluluklar}
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
                  name="hand-o-right"
                  color="black"
                  size={35}
                  onPress={() => TopluklukJoin(item.id)}
                />
              </View>
              <View
                style={{
                  paddingLeft: 15,
                  paddingRight: 40,
                  alignItems: 'flex-start',
                }}>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {'Adı : ' + item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>
                  {'Açıklaması : ' + item.info}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
