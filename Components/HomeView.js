import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

const onPressComplete = () => {
  console.log('onPressComplete');

};

const HomeView = ({ navigation }) => {

  const [addressState, setAddressState] = useState({
    addressArray: initialAddressArray,
    cidrMask: initialCidrMask
  });

  const handleToggleComplete = (id, value, cidrMask) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> handleToggleComplete');
    console.log(id, value, cidrMask);
      if (value) {
        setAddressState({ ...addressState.addressArray[id], value: value });
      };
      if (cidrMask) {
        setAddressState({ ...addressState, cidrMask: cidrMask });
      }
  }

  const BuildInput = ({newAddressArray, cidrMask}) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> BuildInput newAddressArray');
    console.log(newAddressArray);
    return (
      <View style={styles.address}>
      {newAddressArray.map((octet, index) => (
          <View style={styles.address} key={index}>
            <TextInput 
              selectTextOnFocus={true}
              maxLength={3}
              keyboardType='numeric'
              returnKeyType='next'
              textAlign='right'
              placeholder={octet.value}
              blurOnSubmit={false}
              onSubmitEditing={(event) => {
                handleToggleComplete({id: octet.id, value: event.nativeEvent.text});
              }}
            />
            <Text>{octet.spacer}</Text>
        </View>
      ))}
      
      <TextInput 
        selectTextOnFocus={true}
        maxLength={3}
        keyboardType='default'
        returnKeyType='done'
        textAlign='right'
        placeholder={cidrMask}
        onSubmitEditing={(event) => {
          handleToggleComplete({ cidrMask: event.nativeEvent.text});
        }}
      />
    </View>
    );
  };

  return (
    <View style={styles.container}>
      <BuildInput newAddressArray={addressState.addressArray} cidrMask={addressState.cidrMask} />
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


const initialAddressArray = [
  {
    id: 0,
    value: '192',
    spacer: '.'
  },
  {
    id: 1,
    value: '168',
    spacer: '.'
  },
  {
    id: 2,
    value: '0',
    spacer: '.'
  },
  {
    id: 3,
    value: '1',
    spacer: ' '
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
