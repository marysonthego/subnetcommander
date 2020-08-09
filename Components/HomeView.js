import React, { useState, useRef, createRef, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
//import { onChange } from 'react-native-reanimated';

const onPressComplete = () => {
  console.log('onPressComplete');

};

const HomeView = ({ navigation }) => {
 
  var refArray = [useRef(null),
                      useRef(null),
                      useRef(null),
                      useRef(null),
                      useRef(null),];

 

  // const updateAddress = ({ id, value }) => {
  //   console.log(`\nupdateAddress id = ${id} value = ${value}`);
  //   setAddress(({id, value}) => {
  //     address[id].value = value; 
  //   })
  //   console.log(`\n\nsetAddressPart = ${JSON.stringify(address[id])}`);
  // };

  //useEffect(() => {
    //BuildInput();
    //console.log(`\nuseLayoutEffect setAddressState`);
  //}, [address]);

  //const handleToggleComplete = ({ id, text }) => {
    //let value = text.replace(/[^0-9]/g, '0');
    //setAddress (prevAddress => address.map(item => ({...item, value: value})));
//}

  // const onChange = ({id, text}) => {
  //     let value = text.replace(/[^0-9]/g, '0');
  //     console.log(`\nonChange id = ${id} text = ${text} newText = ${value}`);
  //     updateAddress({id, value});
  // }

  // const handleToggleComplete = ({ id, value }) => {
  //   console.log('\n>>>>> handleToggleComplete');
  //   console.log(`\nid= ${id}, value= ${value}, refArray.length= ${refArray.length}`);
  //   if (value > -1) {
  //     updateAddressPart({ id, value });
  //   }
  // };

  const BuildInput = () => {
    const [address, setAddress] = useState(initialAddress);
    //setAddress(initialAddress);
    var newAddress = [];
    var next =0;
    //console.log(`\nBuildInput initialAddress = ${JSON.stringify(initialAddress)}`);
    //(!address && address.from(initialAddress));
    //console.log(`\nBuildInput address = ${JSON.stringify(address)}`);

    const handleToggleComplete = ({ id, value, max }) => {
      console.log(`handleToggleComplete id= ${id} value = ${value} max = ${max}`);
      let text = value;
      while(text.length < max) text = '0' + text;
      console.log(`text = ${text}`);

      newAddress = newAddress.from(address);
      newAddress.map((item) => {
        (item.id === id ? {...item, value: text} : item)
      });
      console.log(`\nBuildInput newAddress = ${JSON.stringify(newAddress)}`);
    };

    return (
      <View style={styles.addressRow}>
       
        {address.map((item) => (
          <View style={styles.address} key={item.id}>
            <TextInput style={[styles.address, styles.textInput]} 
              //key={item.id}
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
              //onLayout= {(event) => {
                //autofocus='true';
                //console.log(`\nonLayout refArray[item.id].current._nativeTag = ${JSON.stringify(refArray[item.id].current._nativeTag)} item.id = ${item.id} refArray.length = ${refArray.length}`);
              //}}
              onSubmitEditing={(event) => {
                next=(item.id < 4 ? item.id + 1 : item.id);
                console.log(`\nonSubmitEditing id= ${item.id} nativeEvent.input= ${event.nativeEvent.text} next = ${next}`);
               
                handleToggleComplete({ id: item.id, value: event.nativeEvent.text, max: refArray[item.id].current.NativeProps.maxLength });
                refArray[next].current.focus();
              }}

            />
            <Text style={[styles.address, styles.spacer]}>{item.spacer}</Text>
          </View>
        ))}
         {setAddress(newAddress)}
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
    //alignItems: "flex-start",
    backgroundColor: 'grey',
  },
  addressRow: {
    //flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    //padding: 10,
    height: 40,
    //width: '75%',
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
