import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const onPressComplete = () => {
  console.log('onPressComplete');
};

const HomeView = ({ navigation }) => {
  var changed = 0;
  var refArray = [useRef(null),
  useRef(null),
  useRef(null),
  useRef(null),
  useRef(null)];

  const useAddress = (newAddress = initialAddress) => {
    const [address, setAddress] = useState(newAddress);
    const {current: changeAddress} = useRef(function changeAddress(newAddress  = initialAddress) {
      setAddress(address);
    });
    return [address, changeAddress];
  };

  useAddress(initialAddress);

  const handleToggleComplete = ({ id, value, newAddress }) => {

    console.log(`handleToggleComplete id= ${id} value = ${value}`);

    let text = value;
    while (text.length < 3) text = "0" + text;

    console.log(`\ntext = ${text}`);
   
    changed = 0;

    newAddress = newAddress.map((item) => {
      if (item.id === id) {
        if (item.value === text) {
          changed--;
          return item;
        }
        else {
          if (item.value !== text) {
            changed++;
            return item = { ...item, value: text };
          }
        }
      }
      else return item;
    }
    );

    console.log(`\nhandleToggleComplete \nnewAddress = ${JSON.stringify(newAddress)} \nchanged = ${changed}`);

  };

  const BuildInput = () => {

    const [anAddress, updateAddress] = useAddress([]);
    var newAddress = [];
    var next = 0;
    (changed > -5 && useAddress(newAddress)); 

    return (
      <View style={styles.addressRow}>
        {anAddress.map((item) => (
          <View style={styles.address} key={(item.id).toString()} >
            <TextInput 
              style={[styles.address, styles.textInput]}
              selectTextOnFocus={true}
              selectionColor="gainsboro"
              keyboardType='numeric'
              textAlign='right'
              placeholder={item.value}
              placeholderTextColor='lightgray'
              blurOnSubmit={false}
              autoFocus={item.id === 0 ? true : false}
              maxLength={item.type === 'octet' ? 3 : 2}
              returnKeyType={item.type === 'octet' ? 'next' : 'done'}

              ref={ref => { refArray[item.id].current = ref }}
              
              {...newAddress = Array.from(useAddress())}
              
              onSubmitEditing={(event) => {
                next = (item.id < 4 ? item.id + 1 : item.id);
                
                let id = item.id;
                
                console.log(`\nonSubmitEditing id= ${item.id} nativeEvent.input= ${event.nativeEvent.text} next = ${next} `);
                
                handleToggleComplete({ id: item.id, value: event.nativeEvent.text, newAddress: newAddress });
                
                refArray[next].current.focus();
              }}
            />
            <Text style={[styles.address, styles.spacer]}>{item.spacer}</Text>
          </View>
        ))}
      </View>
    );
  };

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

  return (
    <View style={styles.container}>
      <BuildInput />
      <View style={styles.buttons}>
        <Button title="Submit" color="grey"
          onPress={() => onPressComplete()}>
        </Button>
        <Button title="Details" color="grey"
          onPress={() => navigation.navigate("Details")}>
        </Button>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    padding: 10,
    justifyContent: "flex-start",
    backgroundColor: 'grey',
  },
  addressRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 40,
    justifyContent: "flex-start",
    backgroundColor: 'cyan',
  },
  address: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: 'center',
    textAlignVertical: 'bottom',
    fontSize: 18,
    height: '100%',
    color: 'black',
    backgroundColor: 'ghostwhite',
  },
  textInput: {
    textDecorationLine: 'underline',
  },
  spacer: {
    textDecorationLine: 'none',
    backgroundColor: 'ghostwhite',
  },
  buttons: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
    width: 400,
    backgroundColor: 'lightgrey',
  }
});

export default HomeView;
