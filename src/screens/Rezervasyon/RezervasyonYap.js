import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Text, View, ScroolView} from 'react-native';
import {Button, Select, Box} from 'native-base';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../components/Api/Api';

export default function RezervasyonYap({route}) {
  const [firstLoading, setFirstLoading] = useState(false);
  const [tesisler, setTesisler] = useState([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {token, role} = route.params;
  const [rezervasyonSaatleri, setRezervasyonSaatleri] = useState([]);
  const [facilityId, setFacilityId] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (firstLoading) {
      RezervasyonListe();
    } else {
      TesisListele();
      setFirstLoading(true);
    }
  }, [date, facilityId, refresh]);

  function DeleteRezervasyonSaatleri(response) {
    console.log('sa');
    var array = [
      {key: '1', hour: '08:00'},
      {key: '2', hour: '09:00'},
      {key: '3', hour: '10:00'},
      {key: '4', hour: '11:00'},
      {key: '5', hour: '12:00'},
      {key: '6', hour: '13:00'},
      {key: '7', hour: '14:00'},
      {key: '8', hour: '15:00'},
      {key: '9', hour: '16:00'},
      {key: '10', hour: '17:00'},
      {key: '11', hour: '18:00'},
    ];

    for (var a = 0; a < response.length; a++) {
      var obj = response[a];
      for (var hour in obj) {
        for (var i = 0; i < array.length; i++) {
          console.log(obj[hour]);
          if (array[i]['hour'] == obj[hour]) {
            console.log(array[i]['hour']);
            array.splice(i, 1);
          }
        }
      }
    }

    setRezervasyonSaatleri(array);
  }

  function RezervasyonListe() {
    api
      .api()
      .post(
        `/${role}/reservation-hour`,
        {date: date, facilityId: facilityId},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (res) {
        if (res.data.status) {
          DeleteRezervasyonSaatleri(res.data.data);
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

  function TesisListele() {
    api
      .api()
      .get(`/${role}/facility`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        if (res.data.status) {
          setTesisler(res.data.data);
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

  function RezervasyonRequest(parameterHour) {
    api
      .api()
      .post(
        `/${role}/reservation`,
        {date: date, hour: parameterHour, facilityId: facilityId},
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
          setRefresh(!refresh);
        } else {
          alert('res.data.message');
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
      <Box safeArea p="5" py="2" w="100%" maxW="450">
        <Select
          selectedValue={facilityId}
          minWidth="200"
          accessibilityLabel="Rezervasyon Yeri Seç"
          placeholder="Rezervasyon Yeri Seç"
          mt={1}
          onValueChange={itemValue => setFacilityId(itemValue)}>
          {tesisler.map(x => {
            return <Select.Item key={x.id} label={x.name} value={x.id} />;
          })}
        </Select>

        <Button
          style={{backgroundColor: '#48AEB1', top: 10}}
          onPress={() => {
            setOpen(true);
          }}>
          Tarih Seç
        </Button>

        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </Box>
      <View>
        <FlatList
          data={rezervasyonSaatleri}
          keyExtractor={item => item.key}
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
                    onPress={() => {
                      RezervasyonRequest(item.hour);
                      setRefresh(!refresh);
                    }}
                  />
                </View>
                <View style={{alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: '700',
                      paddingLeft: 81,
                    }}>
                    {item.hour}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
