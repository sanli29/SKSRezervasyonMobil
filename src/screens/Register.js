import * as React from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  HStack,
  Link,
} from 'native-base';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import api from '../components/Api/Api';

export const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function RegisterRequest() {
    api
      .api()
      .post(`/student/signup`, {
        name: name,
        surname: surname,
        studentNumber: studentNumber,
        email: email,
        password: password,
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
        switch (err.response.status) {
          case 401:
            navigation.navigate('Login');
          default:
            break;
        }
      });
  }

  return (
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <Heading size="lg" color="#000000" fontWeight="semibold">
        Hoş Geldiniz
      </Heading>
      <Heading mt="1" color="#000000" fontWeight="medium" size="xs">
        Kayıt Olunuz !
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input onChange={e => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Surname</FormControl.Label>
          <Input onChange={e => setSurname(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Student Number</FormControl.Label>
          <Input onChange={e => setStudentNumber(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input onChange={e => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" onChange={e => setPassword(e.target.value)} />
        </FormControl>
        <Button
          mt="2"
          style={{backgroundColor: '#E67D14'}}
          onPress={() => {
            RegisterRequest();
          }}>
          Kayıt Ol
        </Button>
        <HStack mt="6" justifyContent="center">
          <Link
            _text={{
              color: '#E67D14',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Hesabın mı var ?
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default () => {
  return (
    <Center flex={1} px="3" style={{backgroundColor: '#48AEB1'}}>
      <Register />
    </Center>
  );
};
