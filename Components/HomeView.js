import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const onPressComplete = () => {
  console.log('onPressComplete');
};

// const useAddress = (newAddress = HomeView.initialAddress) => {
//   const [address, setAddress] = useState(newAddress);
//   const {current: changeAddress} = 
//     useRef(function changeAddress(newAddress = []) {
//       setAddress(newAddress);
//     });
//   return [address, changeAddress];
// };

const HomeView = ({ navigation }) => {
  var init = true,
      changed,
      next,
      newAddress;

  var refArray = [useRef(null),
  useRef(null),
  useRef(null),
  useRef(null),
  useRef(null)];

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

      if (init) {
        changed = 0;
        next = 0;
        newAddress = initialAddress.slice();
        init = false;
      }

  console.log(`\nHomeView \nnewAddress = ${JSON.stringify(newAddress)}`);

   ////
 const handleToggleComplete = ({ id, value }) => {

  console.log(`\nhandleToggleComplete \nid= ${id} value = ${value}`);

  let text = value;

  while (text.length < 3) text = "0" + text;

  console.log(`\ntext = ${text}`);
 
  changed = 0;

  newAddress = newAddress.map((item) => {
    if (item.id === id) {
      if (item.value === text) {
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
  });

  console.log(`\nEND handleToggleComplete \nnewAddress = ${JSON.stringify(newAddress)} \nchanged = ${changed}`);

  return newAddress;
};
////
  const BuildInput = () => {

    //const [anAddress, updateAddress] = useAddress();
    const [address, setAddress] = useState(initialAddress);

    console.log(`\nSTART BuildInput \nnewAddress = ${JSON.stringify(newAddress)} \nchanged = ${changed} next = ${next}`);

    console.log(`\nSTART BuildInput \naddress = ${JSON.stringify(address)} \nchanged = ${changed} next = ${next}`);

    if (changed > 0) {
     // setAddress(newAddress);
      changeed = 0;
    } 

    return (
      <View style={styles.addressRow}>
        {address.map((item) => (
          <View style={styles.address} key={item.id.toString()}>
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
              
             //{...newAddress = Array.from(useAddress())}
              
              onSubmitEditing={(event) => {
                next = (item.id < 4 ? item.id + 1 : item.id);
                
                console.log(`\nonSubmitEditing \nid= ${item.id} \nnativeEvent.text= ${event.nativeEvent.text} \nnext = ${next} `);
                
                handleToggleComplete({ id: item.id, value: event.nativeEvent.text});
                setAddress (newAddress);

                //setAddress ((newAddress) => {(handleToggleComplete({ id: item.id, value: event.nativeEvent.text}))});
               
                console.log(`\nBack from handleToggleComplete\nitem.id = ${item.id} next= ${next} changed = ${changed} \nnewAddress = ${JSON.stringify(newAddress)}`)
               
                refArray[next].current.focus();

                console.log(`\nEND onSubmitEditing \nitem.id = ${item.id} next = ${next} changed = ${changed}`);
              }}
            />
            <Text style={[styles.address, styles.spacer]}>{item.spacer}</Text>
          </View>
        ))}
      </View>
    );
  };

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
