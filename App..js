import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle :{
            fontWeight: 'bold',
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

class App extends Component {
  
  render() {
    const scheme = useColorScheme();
  return (
    <AppearanceProvider>
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavStack />
    </NavigationContainer>
    </AppearanceProvider>
  );}
};

console.disableYellowBox = true;

export default App;