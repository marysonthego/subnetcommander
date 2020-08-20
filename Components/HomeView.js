import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { myColors, styles } from '../assets/style';
import { initialAddress, initialBinaryAddress } from '../assets/initializers';
import { validateInput } from './Functions';

const onPressComplete = () => {
  console.log('onPressComplete');
};

var init = true,
    next;
  const HomeView = ({ navigation }) => {
  const [address, setAddress] = useState(initialAddress);
  const [binArray, setBinArray] = useState(initialBinaryAddress);
  if (init) {
    changed = 0;
    next = 0;
    init = false;
  }

console.log(`HomeView`);

  return (
    <View style={styles.container}>
      <BuildInput address={address} setAddress={setAddress} binArray={binArray} setBinArray={setBinArray} />
      <View style={styles.decal}>
        <FontAwesome name="superpowers" size={99} color={myColors.secondaryDarkColor} />
      </View>
      <View style={styles.buttons}>
        <FontAwesome.Button name="check-circle-o" size={20} color={myColors.primaryTextColor} backgroundColor={myColors.primaryColor} onPress={() => navigation.navigate("Details")}>SAVE</FontAwesome.Button>
        <FontAwesome.Button name="list-ol" size={20} color={myColors.primaryTextColor} backgroundColor={myColors.primaryColor} onPress={() => navigation.navigate("Details")}>DETAILS</FontAwesome.Button>
      </View>
    </View >
  )
};

const BuildInput = ({ address, setAddress, binArray, setBinArray }) => {

console.log(`BuildInput`);

  var newText = '';
  const refArray = [useRef(null),
  useRef(null),
  useRef(null),
  useRef(null),
  useRef(null)];
  changeed = 0;
  const updateRefValue = ({ newText, item }) => {
    refArray[item.id].current.setNativeProps({ text: newText });
  };
  return (
    <View>
      <View style={styles.addressRow}>
        {address.map((item) => (
          <View style={styles.address} key={item.id.toString()}>
            <TextInput
              ref={component => refArray[item.id].current = component}
              item={item}
              style={[styles.address, styles.textInput]}
              placeholder={initialAddress[item.id].value}
              autoFocus={item.id === 0 ? true : false}
              maxLength={item.type === 'octet' ? 3 : 2}
              returnKeyType={item.type === 'octet' ? 'next' : 'done'}
              clearTextOnFocus={true}
              selectionColor="gainsboro"
              keyboardType='numeric'
              textAlign='right'
              placeholderTextColor='grey'
              blurOnSubmit={false}
              onChangeText={text => {
                updateRefValue({ newText: text, item: item });
              }}
              onSubmitEditing={event => {
                console.log(`\nonSubmitEditing\n`);
                newText = validateInput({ address: address, setAddress: setAddress, binArray: binArray, setBinArray: setBinArray, item: item, text: event.nativeEvent.text });
                updateRefValue({ newText: newText, item: item });
                next = (item.id < 4 ? item.id + 1 : item.id);
                refArray[next].current.focus();
                setAddress(address.map((a) => {
                  if (a === item) {
                    item.value = newText;
                    return { ...item, value: newText };
                  }
                  return a;
                }))
              }}
            />
            <Text style={[styles.address, styles.spacer]}>
              {item.spacer}
            </Text>
          </View>
        ))}
      </View>
      <View>
        <View style={styles.addressRow}>
          {binArray.map((item) => (
            <View style={styles.address} key={item.id.toString()}>
              <Text style={styles.address} key={item.id.toString()}>
                {(item.id < 4 && item.value)}
              </Text>
              <Text style={[styles.address, styles.spacer]}>
                {(item.id < 3 && item.spacer)}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.addressRow}>
          <Text style={styles.address}>
            {binArray[4].value}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeView;
