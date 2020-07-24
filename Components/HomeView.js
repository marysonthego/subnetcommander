import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import NumberFormat from 'react-number-format';


const onPressComplete = () => {
  console.log('onPressComplete');

};

const HomeView = ({ navigation }) => {

  const [addressData, setAddressData] = useState({
    address: initialAddress,
    cidrMask: initialCidrMask
  });

  const handleToggleComplete = (id) => {
    const newAddress = addressData.address.map((item) => {
      if (item.id === id) {
        const updatedAddress = {
          ...item,
        };
        return updatedAddress;
      }
      return item;
    });
    setAddressData({ ...addressData, address: newAddress });
  }

  return (
    <View style={styles.container}>
      <BuildInput address={addressData.address} />
      <TextInput label='CIDR Mask:' mode='flat'
        value={addressData.cidrMask} />
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

const BuildInput = ({ address }) => (
  <View style={styles.address}>
    {address.map((item) => (
      <TextInput key={item.id}
        mode='flat'
        value={item.value}
        render={props =>
          <NumberFormat
            {...props}
            customInput={TextInput}
            displayType='input'
            type='tel'
            isNumericString={true}
            decimalScale={0}
            allowLeadingZeros={true}
            format='###'
            allowEmptyFormatting={true}
            mask='_'
            value={props.value}
            onValueChange={(values) => {
              const { value } = values;
              handleToggleComplete({ id: item.id, value: value });
            }}
          />
        }
      />
    ))}
  </View>
);

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
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    alignContent: "stretch",
    marginTop: 10,
  },
  address: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "stretch",
    marginTop: 10,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export default HomeView;