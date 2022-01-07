import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <NativeBaseProvider>
      <Navigation></Navigation>
    </NativeBaseProvider>
  );
};
export default App;
