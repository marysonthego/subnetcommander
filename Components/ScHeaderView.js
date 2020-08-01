import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header, Icon} from 'react-native-elements';

export default function ScHeader(props) {
  console.log(`title = ${props.title}`);
    return (
      <View>
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: props.title, style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      </View>
    );
}