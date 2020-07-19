<script src="http://localhost:8097"></script>
import * as React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from './HomeView';
import DetailsView from './DetailsView';

const Stack = createStackNavigator();

function Main() {
  return (
    <View>
        <Stack.Navigator
          initialRouteName='Home'
        >
          <Stack.Screen
            name='Home'
            component={HomeView}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name='Details'
            component={DetailsView}
            options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  }
});

export default Main;