import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const onPressComplete = () => {
  console.log('onPressComplete');
};

var init = true,
changed,
next,
newAddress,
errMsg;

const initialAddress =
[
{
  id: 0,
  type: 'octet',
  value: '192',
  spacer: '.'
},
{
  id: 1,
  type: 'octet',
  value: '168',
  spacer: '.'
},
{
  id: 2,
  type: 'octet',
  value: '000',
  spacer: '.'
},
{
  id: 3,
  type: 'octet',
  value: '001',
  spacer: '/'
},
{
  id: 4,
  type: 'cidr',
  value: '24',
  spacer: ''
}];

const HomeView = ({ navigation }) => {

      if (init) {
        changed = 0;
        next = 0;
        newAddress = initialAddress.slice();
        init = false;
      }
    
  console.log(`\nHomeView init = ${init}\nnewAddress = ${JSON.stringify(newAddress)}`);
 
  return (
    <View style={styles.container}>
      <BuildInput />
      <View style={styles.decal}>
        <FontAwesome name="superpowers" size={99} color="#1a237e" />
      </View>
      <View style={styles.buttons}>
        <FontAwesome.Button name="check-circle-o" size={24} color="white" backgroundColor="#0d47a1" onPress={() => navigation.navigate("Details")}>SAVE</FontAwesome.Button>
        <FontAwesome.Button name="list-ol" size={24} color="white" backgroundColor="#0d47a1" onPress={() => navigation.navigate("Details")}>DETAILS</FontAwesome.Button>
      </View>
    </View >
  );
};

const ValidateInput = (props) => {

  console.log(`\nValidateInput \nprops.item: ${JSON.stringify(props.item)} \nprops.text: ${JSON.stringify(props.text)}`);

  var newText = props.text;
  var newItem = props.item;
  let num = ~~newText;
  let len = 0;
  
  if (newItem.type.localeCompare('octet') === 0) {
    len = 3;
    if (num < 0 || num > 255) {
      newText = '000';
      errMsg = "Error: number must be between 0 and 255 inclusive."
    }
  }
  else if (newItem.type.localeCompare('cidr') === 0) {
    if(num < 0 || num > 31) {
      len = 2;
      newText = '00';
      errMsg = "Error: CIDR mask must be between 0 and 31 inclusive."
    }
  }
  while (newText.length < len) newText = "0" + newText;
  
  newItem.value = newText;

  console.log(`\nnewText = ${newText} newText.length = ${newText.length} newItem.value = ${newItem.value}`);

  updateAddress({item: newItem});
  
  return (newText);
};

const updateAddress = ({ item }) => {
  
  console.log(`\nupdateAddress item.id: ${item.id} item.value: ${item.value}`);
  
  changed = 0;
  newAddress = newAddress.map((obj) => {
    console.log(`obj.id: ${obj.id} obj.value: ${obj.value}`);
    if (obj.id === item.id) {
      if (obj.value.localeCompare(item.value) === 0) {
        return obj;
      }
      else {
        if (obj.value.localeCompare(item.value) !== 0) {
          changed++;
          obj = { ...obj, value: item.value };
          console.log(`\nnewAddress changed = ${changed} obj.value = ${obj.value}`);
          return obj;
        }
      }
    }
    else return obj;
  });
};

const BuildInput = () => {
 
  const [address, setAddress] = useState(initialAddress);
  var newText = '';
 
  const refArray = [useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)];
  changeed = 0;

  const updateValue = ({newText, item}) => {
    refArray[item.id].current.setNativeProps({text: newText});
 };

  console.log(`\nBuildinput address:\n${JSON.stringify(address)}`);

  return (
    <View style={styles.addressRow}>
      {address.map((item) => (
        <View style={styles.address} key={item.id.toString()}>
        <TextInput    
          ref={component => refArray[item.id].current = component}
          item={item}

          onChangeText={text => { 
            updateValue({newText: text, item: item});
          }}
         
          onSubmitEditing={event => {
            console.log(`\nonSubmitEditing\n`);
            newText = ValidateInput({item: item, text: event.nativeEvent.text});
            updateValue({newText: newText, item: item});
            next = (item.id < 4 ? item.id + 1 : item.id);
            refArray[next].current.focus();
            setAddress(address.map((a) => {
              if (a === item ) {
                item.value = newText;
                return {...item, value: newText};
              }
              return a;
            }))
          }}
          style={[styles.address, styles.textInput]}
          placeholder={initialAddress[item.id].value}
          autoFocus={item.id === 0 ? true : false}
          maxLength={item.type === 'octet' ? 3 : 2}
          returnKeyType={item.type === 'octet' ? 'next' : 'done'}
          selectTextOnFocus={true}
          selectionColor="gainsboro"
          keyboardType='numeric'
          textAlign='right'
          placeholderTextColor='grey'
          blurOnSubmit={false}
        />
        <Text style={[styles.address, styles.spacer]}>{item.spacer}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    padding: 10,
    justifyContent: "flex-start",
    backgroundColor: '#e0e0e0',
  },
  addressRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 30,
    justifyContent: "flex-start",
    backgroundColor: '#e0e0e0',
  },
  address: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: 'center',
    textAlignVertical: 'bottom',
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    //height: '100%',
    color: 'black',
    backgroundColor: '#f5f5f5',
  },
  textInput: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  spacer: {
    textDecorationLine: 'none',
    backgroundColor: '#f5f5f5',
  },
  decal: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#e0e0e0',
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "Roboto",
    backgroundColor: '#e0e0e0',
  }
});

export default HomeView;
