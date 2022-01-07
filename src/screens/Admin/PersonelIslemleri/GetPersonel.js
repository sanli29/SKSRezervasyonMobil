import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Text, View} from 'react-native';
import {Button, Modal, FormControl, Input, Select, Box} from 'native-base';
import api from '../../../components/Api/Api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GetPersonel({route}) {
  const {token, role} = route.params;
  const [personeller, setPersoneller] = useState([]);
  const [AddShowModal, setAddShowModal] = useState(false);
  const [UpdateShowModal, setUpdateShowModal] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    PersonelListele();
  }, [refresh]);

  function PersonelListele() {
    api
      .api()
      .get(`/${role}/academical`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        if (res.data.status) {
          setPersoneller(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch(function (err) {
        alert(err);
        setPersoneller([
          {
            id: 1,
            name: 'deneme',
            surname: 'deneme',
            email: 'deneme11@deneme.com',
            created_at: '2022-01-03T01:24:25.000000Z',
            updated_at: '2022-01-03T01:26:16.000000Z',
          },
        ]);
      });
  }

  function PersonelUpdate() {
    api
      .api()
      .put(
        `/${role}/academical/${id}`,
        {
          name: name,
          surname: surname,
        },
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
          setUpdateShowModal(false);
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
    setRefresh(!refresh);
  }

  function PersonelAdd() {
    api
      .api()
      .post(
        `/${role}/academical`,
        {
          name: name,
          surname: surname,
          email: email,
          password: password,
        },
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
          setAddShowModal(false);
        } else {
          alert(res.data.message);
        }
      })
      .catch(function (err) {
        alert(err);
      });
    setRefresh(!refresh);
  }

  function PersonelDelete(parametreId) {
    api
      .api()
      .delete(`/${role}/academical/${parametreId}`, {
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
        switch (err.response.status) {
          case 401:
            navigation.navigate('Login');
          default:
            break;
        }
      });
    setRefresh(!refresh);
  }

  return (
    <View style={{flex: 1}}>
      <Modal isOpen={AddShowModal} onClose={() => setAddShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <FormControl.Label>Personel İsim</FormControl.Label>
              <Input onChangeText={e => setName(e)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Personel Soyismi</FormControl.Label>
              <Input onChangeText={e => setSurName(e)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Personel Email</FormControl.Label>
              <Input onChangeText={e => setEmail(e)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Personel Password</FormControl.Label>
              <Input onChangeText={e => setPassword(e)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setAddShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                style={{backgroundColor: '#F9A041'}}
                onPress={() => {
                  PersonelAdd();
                  setRefresh(!refresh);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={UpdateShowModal} onClose={() => setUpdateShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Update</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <FormControl.Label>Personel İsim</FormControl.Label>
              <Input defaultValue={`${name}`} onChangeText={e => setName(e)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Personel Soyisim</FormControl.Label>
              <Input
                defaultValue={`${surname}`}
                onChangeText={e => setSurName(e)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setUpdateShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                style={{backgroundColor: '#F9A041'}}
                onPress={() => {
                  PersonelUpdate();
                  setRefresh(!refresh);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <FlatList
        data={personeller}
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
                  name="edit"
                  color="black"
                  size={35}
                  onPress={() => {
                    setId(item.id);
                    setName(item.name);
                    setSurName(item.surname);
                    setUpdateShowModal(true);
                  }}
                />
                <Icon
                  name="trash"
                  color="black"
                  size={35}
                  style={{marginTop: 10}}
                  onPress={() => {
                    PersonelDelete(item.id);
                    setRefresh(!refresh);
                  }}
                />
              </View>
              <View style={{paddingLeft: 20, alignItems: 'flex-start'}}>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {'Adı : ' + item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>
                  {'Soyadı : ' + item.surname}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>
                  {'Email : ' + item.email}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <Box safeArea p="5" py="2" w="100%" maxW="450">
        <Button
          style={{backgroundColor: '#48AEB1'}}
          onPress={() => setAddShowModal(true)}>
          Personel Ekle
        </Button>
      </Box>
    </View>
  );
}
