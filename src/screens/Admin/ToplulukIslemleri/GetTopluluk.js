import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Text, View} from 'react-native';
import {Button, Modal, FormControl, Input, Box, Select} from 'native-base';
import api from '../../../components/Api/Api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GetTopluluk({route}) {
  const {token, role} = route.params;
  const [topluluklar, setTopluluklar] = useState([]);
  const [AddShowModal, setAddShowModal] = useState(false);
  const [UpdateShowModal, setUpdateShowModal] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [academicalPersonelId, setAcademicalPersonelId] = useState(0);
  const [presidentStudentId, setPresidentStudentId] = useState(0);
  const [academicalPersonel, setAcademicalPersonel] = useState([]);
  const [presidentStudent, setPresidentStudent] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (AddShowModal || UpdateShowModal) {
      AcademicalPersonelListele();
      PresidentStudentListele();
    } else {
      ToplulukListele();
    }
  }, [AddShowModal, UpdateShowModal, refresh]);

  function ToplulukListele() {
    api
      .api()
      .get(`/${role}/community`, {
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

  function ToplulukUpdate() {
    api
      .api()
      .put(
        `/${role}/community/${id}`,
        {
          name: name,
          info: info,
          academicalPersonalId: academicalPersonelId,
          presidentStudentId: presidentStudentId,
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
  }

  function ToplulukAdd() {
    console.log(name);
    console.log(info);
    console.log(academicalPersonelId);
    console.log(presidentStudentId);
    api
      .api()
      .post(
        `/${role}/community`,
        {
          name: name,
          info: info,
          academicalPersonalId: academicalPersonelId,
          presidentStudentId: presidentStudentId,
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
        alert(err.response.status);
        switch (err.response.status) {
          case 401:
            navigation.navigate('Login');
          default:
            break;
        }
      });
  }

  function ToplulukDelete(parametreId) {
    api
      .api()
      .delete(`/${role}/community/${parametreId}`, {
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

  function AcademicalPersonelListele() {
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
          setAcademicalPersonel(res.data.data);
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
  function PresidentStudentListele() {
    api
      .api()
      .get(`/${role}/student`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        if (res.data.status) {
          setPresidentStudent(res.data.data);
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
    <View style={{flex: 1}}>
      <Modal isOpen={AddShowModal} onClose={() => setAddShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <FormControl.Label>Topluluk Ismi</FormControl.Label>
              <Input onChangeText={e => setName(e)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Topluluk Açıklama</FormControl.Label>
              <Input onChangeText={e => setInfo(e)} />
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Akademik Personel</FormControl.Label>
              <Select
                selectedValue={academicalPersonelId}
                minWidth="200"
                accessibilityLabel="Akademik Personel Ata"
                placeholder="Akademik Personel Ata"
                mt={1}
                onValueChange={itemValue => {
                  setAcademicalPersonelId(itemValue);
                }}>
                {academicalPersonel.map(x => {
                  return (
                    <Select.Item
                      key={x.id}
                      label={x.name + ' ' + x.surname}
                      value={x.id}
                    />
                  );
                })}
              </Select>
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Başkan Öğrenci</FormControl.Label>
              <Select
                selectedValue={presidentStudentId}
                minWidth="200"
                accessibilityLabel="Başkan Öğrenci Ata"
                placeholder="Başkan Öğrenci Ata"
                mt={1}
                onValueChange={itemValue => setPresidentStudentId(itemValue)}>
                {presidentStudent.map(x => {
                  return (
                    <Select.Item
                      key={x.id}
                      label={x.name + ' ' + x.surname}
                      value={x.id}
                    />
                  );
                })}
              </Select>
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
                  ToplulukAdd();
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
              <FormControl.Label>Topluluk Ismi</FormControl.Label>
              <Input onChangeText={e => setName(e)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Topluluk Açıklama</FormControl.Label>
              <Input onChangeText={e => setInfo(e)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Akademik Personel</FormControl.Label>
              <Select
                selectedValue={academicalPersonelId}
                minWidth="200"
                accessibilityLabel="Akademik Personel Ata"
                placeholder="Akademik Personel Ata"
                mt={1}
                onValueChange={itemValue => setAcademicalPersonelId(itemValue)}>
                {academicalPersonel.map(x => {
                  return (
                    <Select.Item
                      key={x.academicalPersonalId}
                      label={x.name + ' ' + x.surname}
                      value={x.academicalPersonalId}
                    />
                  );
                })}
              </Select>
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Başkan Öğrenci</FormControl.Label>
              <Select
                selectedValue={presidentStudentId}
                minWidth="200"
                accessibilityLabel="Başkan Öğrenci Ata"
                placeholder="Başkan Öğrenci Ata"
                mt={1}
                onValueChange={itemValue => setPresidentStudentId(itemValue)}>
                {presidentStudent.map(x => {
                  return (
                    <Select.Item
                      key={x.presidentStudentId}
                      label={x.name + ' ' + x.surname}
                      value={x.presidentStudentId}
                    />
                  );
                })}
              </Select>
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
                  ToplulukUpdate();
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <FlatList
        data={topluluklar}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: 20,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item}) => {
          console.log(item);
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
                    setInfo(item.info);
                    setAcademicalPersonelId(item.academicalPersonalId);
                    setPresidentStudentId(item.presidentStudentId);
                    setUpdateShowModal(true);
                  }}
                />
                <Icon
                  name="trash"
                  color="black"
                  size={35}
                  style={{marginTop: 10}}
                  onPress={() => {
                    ToplulukDelete(item.id);
                  }}
                />
              </View>
              <View style={{paddingLeft: 20, alignItems: 'flex-start'}}>
                <Text style={{fontSize: 20, fontWeight: '700'}}>
                  {'Topluluk Adı : ' + item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>{item.info}</Text>
                <Text style={{fontSize: 12, opacity: 0.8}}>
                  {'Topluluk Personel : ' +
                    item.academical_personal.name +
                    ' ' +
                    item.academical_personal.surname}
                </Text>
                <Text style={{fontSize: 12, opacity: 0.8}}>
                  {'Topluluk Başkan : ' +
                    item.student.name +
                    ' ' +
                    item.student.surname}
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
          Topluluk Ekle
        </Button>
      </Box>
    </View>
  );
}
