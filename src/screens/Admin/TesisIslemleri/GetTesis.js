import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Text, View} from 'react-native';
import {Button, Modal, FormControl, Input, Select, Box} from 'native-base';
import api from '../../../components/Api/Api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GetTesis({route}) {
  const {token, role} = route.params;
  const [tesisler, setTesisler] = useState([]);
  const [AddShowModal, setAddShowModal] = useState(false);
  const [UpdateShowModal, setUpdateShowModal] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [status, setStatus] = useState(0);
  const [price, setPrice] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    TesisListele();
  }, [refresh]);

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
      });
  }

  function TesisUpdate() {
    api
      .api()
      .put(
        `/${role}/facility/${id}`,
        {
          name: name,
          status: status,
          price: price,
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

  function TesisAdd() {
    console.log(name);
    console.log(facilityName);
    console.log(status);
    console.log(price);
    api
      .api()
      .post(
        `/${role}/facility`,
        {
          name: name,
          facilityName: facilityName,
          status: status,
          price: price,
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

  function TesisDelete(parametreId) {
    api
      .api()
      .delete(`/${role}/facility/${parametreId}`, {
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
              <FormControl.Label>Tesis Ismi</FormControl.Label>
              <Input onChangeText={e => setName(e)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Tesis Turu</FormControl.Label>
              <Input onChangeText={e => setFacilityName(e)} />
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Tesis Durumu</FormControl.Label>
              <Select
                selectedValue={status}
                minWidth="200"
                accessibilityLabel="Tesis Durumu"
                placeholder="Tesis Durumu"
                mt={1}
                onValueChange={itemValue => {
                  setStatus(itemValue);
                }}>
                <Select.Item label="Acık" value="1" />
                <Select.Item label="Kapalı" value="0" />
              </Select>
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Tesis Ücreti</FormControl.Label>
              <Input onChangeText={e => setPrice(e)} />
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
                  TesisAdd();
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
              <FormControl.Label>Tesis Ismi</FormControl.Label>
              <Input defaultValue={`${name}`} onChangeText={e => setName(e)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Tesis Durumu</FormControl.Label>
              <Select
                selectedValue={status}
                minWidth="200"
                accessibilityLabel="Tesis Durumu"
                placeholder="Tesis Durumu"
                mt={1}
                onValueChange={itemValue => setStatus(itemValue)}>
                <Select.Item label="Acık" value="1" />
                <Select.Item label="Kapalı" value="0" />
              </Select>
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Tesis Ücreti</FormControl.Label>
              <Input
                defaultValue={`${price}`}
                onChangeText={e => setPrice(e)}
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
                  TesisUpdate();
                  setRefresh(!refresh);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <FlatList
        data={tesisler}
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
                    setStatus(item.status);
                    setPrice(item.price);
                    setUpdateShowModal(true);
                  }}
                />
                <Icon
                  name="trash"
                  color="black"
                  size={35}
                  style={{marginTop: 10}}
                  onPress={() => {
                    TesisDelete(item.id);
                    setRefresh(!refresh);
                  }}
                />
              </View>
              <View style={{paddingLeft: 20, alignItems: 'flex-start'}}>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {'Tesis Adı : ' + item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.8}}>
                  {'Tesis Ücreti : ' + item.price}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.8}}>
                  {'Tesis Durumu : ' + item.status}
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
          Tesis Ekle
        </Button>
      </Box>
    </View>
  );
}
