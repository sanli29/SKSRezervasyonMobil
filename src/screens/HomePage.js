import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Box, Button} from 'native-base';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#a3ffff'}}>
      <View style={styles.logos}>
        <Image
          style={styles.tinyLogo}
          source={require('../components/images/BakircayLogo.jpg')}
        />
        <Image
          style={styles.tinyLogo}
          source={require('../components/images/SksLogo.png')}
        />
      </View>
      <View>
        <Box safeArea p="8" py="4" w="100%">
          <Button
            mt="2"
            style={{backgroundColor: '#FA9943'}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Login
          </Button>
          <Button
            mt="2"
            style={{top: 5, backgroundColor: '#FA9943'}}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            Sign in
          </Button>
        </Box>
        <View>
          <Video
            source={require('../components/videos/SksVideo.mp4')}
            style={styles.backgroundVideo}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: '100%',
    width: '100%',
    top: 80,
    margin: 'auto',
  },
  tinyLogo: {
    width: 130,
    height: 130,
    padding: 50,
    margin: 32,
  },
  logos: {flexDirection: 'row'},
});
