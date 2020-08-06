import React, { useState, useRef, createRef, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const onPressComplete = () => {
  console.log('onPressComplete');

};

const HomeView = ({ navigation }) => {
  var addressArray = [];
  var refArray = [useRef(null),
                      useRef(null),
                      useRef(null),
                      useRef(null),
                      useRef(null),];

  const [addressState, setAddressState] = useState(initialAddressArray);
  const [addressObj, setAddressObj] = useState(addressState);

  const updateAddress = ({ id, value }) => {
    console.log(`\nupdateAddress id = ${id} value = ${value}`);

    setAddressObj((id, value) => {addressState.map((id) => { 
      if (addressState.id === id) {
        addressState.value = value};}
      )});
    console.log(`\nupdateAddress addressObj = ${JSON.stringify(addressState)}`);
  };

  useLayoutEffect(() => {
    setAddressState(initialAddressArray);
    console.log(`\nuseLayoutEffect addressState = ${JSON.stringify(addressState)}`);
  }, []);

  const handleToggleComplete = ({ id, value }) => {
    console.log('>>>>> handleToggleComplete');
    console.log(`id= ${id}, value= ${value}, length= ${refArray.length}`);
    if (value > -1) {
      updateAddress({ id, value });
    }
  };

  const BuildInput = () => {
    var next =0;
    (addressState ? addressArray = Array.from(addressState) :
      addressArray = Array.from(initialAddressArray));
    var next = 0;
    console.log(`\nBuildInput \naddressArray = ${JSON.stringify(addressArray)}\n\naddressState = ${JSON.stringify(addressState)}`);
    return (
      <View style={styles.addressRow}>
        {addressArray.map((item) => (
          <View style={styles.address} key={item.id}>
            <TextInput style={[styles.address, styles.textInput]}
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
              
              onLayout= {(event) => {
                autofocus='true'
                console.log(`onLayout refArray[item.id].current._nativeTag = ${JSON.stringify(refArray[item.id].current._nativeTag)} item.id = ${item.id} refArray.length = ${refArray.length}`);
              }}
              onSubmitEditing={(event) => {
                next=(item.id < 4 ? item.id + 1 : item.id);

                console.log(`\nonSubmitEditing id= ${item.id} nativeEvent.input= ${event.nativeEvent.text} next = ${next}`);

                let text = new String(event.nativeEvent.text.padStart(item.maxLength, '0'));

                refArray[item.id].current.value=text;
                console.log(`current.value = ${refArray[item.id].current.value} text = ${text}`);

                refArray[next].current.focus();
                handleToggleComplete({ id: item.id, value: text });
              }}
            />
            <Text style={[styles.address, styles.spacer]}>{item.spacer}</Text>
          </View>
        ))}
      </View>
    );
  };

  const initialAddressArray = [
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
    //alignItems: "flex-start",
    backgroundColor: 'grey',
  },
  addressRow: {
    //flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    //padding: 10,
    height: 40,
    width: '75%',
    justifyContent: "flex-start",
    //backgroundColor: 'dimgrey',
    backgroundColor: 'cyan',
  },
  address: {
    //flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: 'center',
    textAlignVertical: 'bottom',
    fontSize: 18,
    //padding: 10,
    height: '100%',
    //width: '20%',
    color: 'black',
    backgroundColor: 'ghostwhite',
    //backgroundColor: 'hotpink',
  },
  textInput: {
    textDecorationLine: 'underline',
  },
  spacer: {
    textDecorationLine: 'none',
    backgroundColor: 'ghostwhite',
    //width: '5%',
  },
  buttons: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
    //marginTop: 10,
    width: 400,
    backgroundColor: 'lightgrey',
  }
});

export default HomeView;
