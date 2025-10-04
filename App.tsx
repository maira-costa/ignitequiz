import React from 'react';
import { StatusBar } from 'react-native'; // Anotação: npx expo install react-native-gesture-handler em https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler'; 
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </GestureHandlerRootView>
  );
}