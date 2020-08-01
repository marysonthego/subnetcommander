import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import NumberFormat from 'react-number-format';


const onPressComplete = () => {
  console.log('onPressComplete');

};

const HomeView = ({ navigation }) => {

  const [addressData, setAddressData] = useState({
    address: initialAddress,
    cidrMask: initialCidrMask
  });

  const handleToggleComplete = ({id = -1, value = -1, cidrMask = ''}) => {
    if (id > -1 && value > -1) {
      const newAddress = addressData.address.map((item) => {
        if (item.id === id) {
          const updatedAddress = {
            ...item, value: value
          };
          return updatedAddress;
        }
        return item;
      });
      setAddressData({ ...addressData, address: newAddress });
    }
    if (cidrMask) {
      setAddressData({ ...addressData, cidrMask: cidrMask });
    } 
  }

  const BuildInput = ({ address, cidrMask }) => (
    <View style={styles.address}>
      {address.map((item) => (
        <TextInput key={item.id}
          selectTextOnFocus={true}
          maxLength={3}
          keyboardType='numeric'
          returnKeyType='next'
          textAlign='right'
          placeholder={item.value}
          blurOnSubmit={false}
          onSubmitEditing={() => {
            handleToggleComplete({id: item.id, value: item.value});
          }}
        />
      ))}
      <TextInput 
        selectTextOnFocus={true}
        maxLength={3}
        keyboardType='default'
        returnKeyType='done'
        textAlign='right'
        placeholder={cidrMask}
        onSubmitEditing={(text) => {
          handleToggleComplete({ cidrMask: text });
        }}
      />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <BuildInput address={addressData.address} cidrMask={addressData.cidrMask} />
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
    </View >
  );
};


const initialAddress = [
  {
    id: 'octet1',
    value: '192'
  },
  {
    id: 'octet2',
    value: '168'
  },
  {
    id: 'octet3',
    value: '0'
  },
  {
    id: 'octet4',
    value: '1'
  }];

const initialCidrMask = '/24';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: 10,
  },
  address: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginTop: 10,
    height: 40,
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

//The global variable undefined is read-only
// const BuildInput = ({ address }) => (
//   <View style={styles.address}>
//     {address.map((item) => (
//       <TextInput key={item.id}
//         mode='flat'
//         value={item.value}
//         render={props =>
//           <NumberFormat
//             {...props}
//             customInput={TextInput}
//             displayType='input'
//             type='tel'
//             isNumericString={true}
//             decimalScale={0}
//             allowLeadingZeros={true}
//             format='###'
//             allowEmptyFormatting={true}
//             mask='_'
//             value={props.value}
//             onValueChange={(values) => {
//               const { value, value } = values;
//               handleToggleComplete({ id: item.id, value: value });
//             }}
//           />
//         }
//       />
//     ))}
//   </View>
// );
