import React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeView from './Components/HomeView';
import DetailsView from './Components/DetailsView';

const Stack = createStackNavigator();

function NavStack() {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#1a237e',
          },
          headerTintColor: '#fff',
          headerTitleStyle :{
            fontWeight: 'normal',
          },
        }}
      >
      <Stack.Screen 
        name="Home" 
        component={HomeView} 
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsView} 
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}

export default () => {const scheme = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <NavStack />
        <StatusBar style="light" backgroundColor="#0d47a1" />
      </NavigationContainer>
    </AppearanceProvider>
  )};

console.disableYellowBox = true;