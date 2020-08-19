import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const onPressComplete = () => {
  console.log('onPressComplete');
};

var init = true,
changed,
next,
//newAddress,
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

const initialBinaryAddress =
[
{
  id: 0,
  type: 'octet',
  value: '11000000',
  spacer: '.'
},
{
  id: 1,
  type: 'octet',
  value: '10101000',
  spacer: '.'
},
{
  id: 2,
  type: 'octet',
  value: '00000000',
  spacer: '.'
},
{
  id: 3,
  type: 'octet',
  value: '00000001',
  spacer: '/'
},
{
  id: 4,
  type: 'cidr',
  value: '11111111111111111111111100000000',
  spacer: ''
}];

const HomeView = ({ navigation }) => {

  const [address, setAddress] = useState(initialAddress);
  const [binArray, setBinArray] = useState(initialBinaryAddress);

      if (init) {
        changed = 0;
        next = 0;
        //newAddress = initialAddress.slice();
        init = false;
      }
    
  console.log(`\nHomeView init = ${init}\n`);

  return (
    <View style={styles.container}>
      <BuildInput address = {address} setAddress = {setAddress} binArray = {binArray} setBinArray = {setBinArray}/>
      <View style={styles.decal}>
        <FontAwesome name="superpowers" size={99} color="#1a237e" />
      </View>
      <View style={styles.buttons}>
        <FontAwesome.Button name="check-circle-o" size={24} color="white" backgroundColor="#0d47a1" onPress={() => navigation.navigate("Details")}>SAVE</FontAwesome.Button>
        <FontAwesome.Button name="list-ol" size={24} color="white" backgroundColor="#0d47a1" onPress={() => navigation.navigate("Details")}>DETAILS</FontAwesome.Button>
      </View>
    </View >
  )
};

const updateBinaryAddress = ({binArray, setBinArray, id, newText}) => {
  let dec = ~~newText;
  let newBin = dec.toString(2);

  var newBinArray = binArray;

  newBinArray.map((binItem, index) => {
    if(index === id) {
      newBinArray[id].text = newBin;
      return {...binItem, text: newBin};
    }
      return binItem;
  });
  setBinArray(newBinArray);
};

// const ShowBinaryAddress = ({binArray}) => {
//   return (
//     <View style={styles.addressRow}>
//       {binArray.map((item, index) => (
//         <View style={styles.address} key={index.toString()}>
//           <Text style={styles.address}>
//             {item.text}
//           </Text>
//         </View>
//       ))}
//     </View>
//   )
// };

const ValidateInput = ({address, setAddress, binArray, setBinArray, item, text}) => {
  console.log(`\nValidateInput \item: ${JSON.stringify(item)} \ntext: ${JSON.stringify(text)}`);

  var newText = text;
  var newItem = item;
  let id = newItem.id;
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

  updateAddress({address: address, setAddress: setAddress, item: newItem});

  updateBinaryAddress({binArray: binArray, setBinArray: setBinArray, id: id, newText: newText});

  return (newText);
};

const updateAddress = ({address, setAddress, item }) => {
  
  console.log(`\nupdateAddress item.id: ${item.id} item.value: ${item.value}`);
  let newAddress = address;
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
  setAddress(newAddress);
};

const BuildInput = ({address, setAddress, binArray, setBinArray}) => {
  
  var newText = '';
 
  const refArray = [useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)];
  changeed = 0;

  const updateRefValue = ({newText, item}) => {
    refArray[item.id].current.setNativeProps({text: newText});
 };

  console.log(`\nBuildinput address:\n`);

  return (
  <View>
    <View style={styles.addressRow}>
      {address.map((item) => (
        <View style={styles.address} key={item.id.toString()}>
        <TextInput    
          ref={component => refArray[item.id].current = component}
          item={item}

          onChangeText={text => { 
            updateRefValue({newText: text, item: item});
          }}
         
          onSubmitEditing={event => {
            console.log(`\nonSubmitEditing\n`);
            newText = ValidateInput({address: address, setAddress: setAddress, binArray: binArray, setBinArray: setBinArray,item: item, text: event.nativeEvent.text});
            updateRefValue({newText: newText, item: item});
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
    <View style={styles.addressRow}>
      {binArray.map((item) => (
        <Text style={styles.address} key={item.id.toString()}>
          {item.text}
        </Text>   
      ))}
    </View>
  </View>
  );};

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
    //flexWrap: "nowrap",
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
