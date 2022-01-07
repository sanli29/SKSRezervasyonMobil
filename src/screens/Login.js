import React, {useState} from 'react';
import {
  Box,
  Select,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
} from 'native-base';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../components/Api/Api';

export const Login = () => {
  const navigation = useNavigation();
  const [service, setService] = useState('student');
  const [email, setEmail] = useState('deneme@deneme.com');
  const [password, setPassword] = useState('123456');

  function LoginRequest() {
    api
      .api()
      .post(`/${service}/login`, {
        email: email,
        password: password,
        role: service,
      })
      .then(function (res) {
        if (res.data.status) {
          navigation.navigate(service, {
            token: res.data.data.token,
          });
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
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Image
        style={{width: '100%', height: 130, padding: 0, marginBottom: 20}}
        source={require('../components/images/UzunBakircayLogo.jpg')}
      />
      <Heading size="lg" fontWeight="600" color="#000000">
        Hoş Geldiniz
      </Heading>
      <Heading mt="1" color="#000000" fontWeight="medium" size="xs">
        Giriş Yapınız!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input onChangeText={e => setEmail(e)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" onChangeText={e => setPassword(e)} />
        </FormControl>

        <Select
          selectedValue={service}
          minWidth="200"
          accessibilityLabel="Giriş Türü"
          placeholder="Öğrenci"
          mt={1}
          onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="Öğrenci" value="student" />
          <Select.Item label="Personel" value="academical" />
          <Select.Item label="SKS Yöneticisi" value="sksadmin" />
        </Select>

        <Button
          mt="2"
          style={{backgroundColor: '#E67D14'}}
          onPress={() => {
            LoginRequest();
          }}>
          Log in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Link
            _text={{
              color: '#E67D14',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            Kayıt Ol
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default () => {
  return (
    <Center flex={1} px="3" style={{backgroundColor: '#48AEB1'}}>
      <Login />
    </Center>
  );
};
