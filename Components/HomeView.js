import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';

const onPressComplete = () => {
  console.log('onPressComplete');
};

const HomeView = ({ navigation }) => {
  
  const [addressData, setAddressData] = useState({
    address: initialAddress,
    cidrMask: initialCidrMask,
    ref: ref_cidr
  });

  const ref_octet1 = useRef();
  const ref_octet2 = useRef();
  const ref_octet3 = useRef();
  const ref_octet4 = useRef();
  const ref_cidr = useRef();
  const textInput = useRef();


  const handleToggleComplete = ({id = '', text = '', cidrMask = ''}) => {
    if (id === '') {
      return;
    };
 
    addressData.address.map((item) => {
      if (item.id === id) {
        setAddressData({...addressData.address, text: text})
      };
    });
 
    if (cidrMask) {
      setAddressData({ ...addressData, cidrMask: cidrMask })
    } 
  };

  const focusTextInput = (nextRef) => {

    textInput.current.nextRef.focus();
  }

  const BuildInput = ({ address, cidrMask }) => {

    return (
      <View style={styles.address}>
        {address.map((item) => (
          <Input key={item.id}
            keyboardType='number-pad'
            maxLength={3}
            selectTextOnFocus={true}
            defaultValue={item.text}
            autoFocus={true} 
            ref={props.ref}
            nextRef={item.nextRef}
          onSubmitEditing={() => focusTextInput({nextRef})}
          blurOnSubmit={false}
          returnKeyType="next"
        />

      ))}
      <Input 
        selectTextOnFocus={true}
        keyboardType='default'
        maxLength={2}
        textAlign='right'
        onSubmitEditing={(text) => {
          handleToggleComplete({ cidrMask: text });
        }}
        blurOnSubmit={false}
      />
   </View>
 
    );};
  
  return (
    <View style={styles.container}>
      <BuildInput {...addressData} ref={el => inputElement = el} />
      <View style={styles.buttons}>
        <Button
          mode="contained" icon="check-network"
          onPress={() => onPressComplete()}>
          Submit
        </Button>
        <Button
          mode="contained" icon="sitemap"
          onPress={() => navigation.navigate("Details")}>
          Details
      </Button>
      </View>
    </View>
  );
};

const initialAddress = [
  {
    id: 'octet1',
    text: '192',
    ref: 'ref_octet1',
    nextRef: 'ref_octet2',
  },
  {
    id: 'octet2',
    text: '168',
    ref: 'ref_octet2',
    nextRef: 'ref_octet3',
  },
  {
    id: 'octet3',
    text: '0',
    ref: 'ref_octet3',
    nextRef: 'ref_octet4',
  },
  {
    id: 'octet4',
    text: '1',
    ref: 'ref_octet4',
    nextRef: 'ref_cidr',
  }];

const initialCidrMask = '24';
const ref = 'ref_cidr';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: 10,
    width: 800,
  },
  address: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginTop: 10,
    height: 40,
    width: 60,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
    marginTop: 10,
    height: 40,
    width: 400,
  }
});

export default HomeView;
