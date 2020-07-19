import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScHeader from './Components/ScHeaderComponent';

export default function App() {
  return (
    
    <View>
      <StatusBar style='light' translucent={false} backgroundColor='blue'/>
      <ScHeader title='Home' />
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
