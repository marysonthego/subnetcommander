import React from 'react';
import {Header, Icon, Text} from 'React-Native-Elements';

export default function ScHeader(title) {
  return (
    <Header
      placement="left"
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: {title}, style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    />
  )};