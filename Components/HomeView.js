import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const onPressComplete = () => {
  console.log('onPressComplete');

};

const HomeView = ({ navigation }) => {
  const refArray = [];
  var newRef = {};
  const [addressState, setAddressState] = useState({
    addressArray: initialAddressArray,
    cidr: initialCidr,
    id: initialCidrId
  });

  const handleToggleComplete = (id, value, cidr) => {
    console.log('>>>>> handleToggleComplete');
    console.log(id, value, cidr, refArray.length);
    if (value > -1) {
      switch (id) {
        case 0:
        case 1:
        case 2:
        case 3:
          setAddressState({ ...addressState.addressArray[id], value: value });
          if (id + 1 < refArray.length) {
            console.log('You are here')
            console.log(`id= $id length= $refArray.length`)
            refArray[id + 1].current.focus();
          };
        break;
      }
    }
    if (cidr) {
      setAddressState({ ...addressState, cidr: cidr, id: id });
    }
  };

  const BuildInput = ({ addressArray, cidr }) => {
    console.log('>>>>>> BuildInput addressArray cidr');
    console.log(addressArray, cidr);
    return (
      <View style={styles.addressRow}>
        {addressArray.map((octet, index) => (
          refArray.push(newRef = useRef()),
          <View style={styles.addressRow} key={index}>
            <TextInput style={styles.address}
              ref={newRef}
              selectTextOnFocus={true}
              selectionColor="gainsboro"
              maxLength={3}
              keyboardType='numeric'
              returnKeyType='next'
              textAlign='left'
              defaultValue={octet.value}
              blurOnSubmit={false}
              autoFocus={(octet.id === 0) ? true : false}
              id={octet.id}
              onSubmitEditing={(event) => {
                handleToggleComplete({ id: octet.id, value: event.nativeEvent.text });
              }}
            />
            <Text style={[styles.address, styles.spacer]}>{octet.spacer}</Text>
          </View>
        ))}

        <TextInput style={styles.address}
          selectTextOnFocus={true}
          selectionColor="gainsboro"
          maxLength={2}
          keyboardType='numeric'
          returnKeyType='done'
          textAlign='left'
          defaultValue={cidr}
          newRef={useRef(null)}
          arrLength={refArray.push(newRef)}
          ref={newRef}
          onSubmitEditing={(event) => {
            id = 4;
            cidr = event.nativeEvent.text;
            console.log(id, cidr);
            handleToggleComplete({ id: id, cidr: cidr });
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BuildInput addressArray={addressState.addressArray} cidr={addressState.cidr} id={addressState.id} />
      <View style={styles.buttons}>
        <Button title="Submit" color="black"
          onPress={() => onPressComplete()}>
        </Button>
        <Button title="Details" color="black"
          onPress={() => navigation.navigate("Details")}>
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
    value: '000',
    spacer: '.'
  },
  {
    id: 3,
    value: '001',
    spacer: '/'
  }];
const initialCidr = '24';
const initialCidrId = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: 'dimgrey',
  },
  addressRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 30,
    width: 200,
    justifyContent: "flex-start",
    backgroundColor: 'dimgrey',
  },
  address: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    textAlignVertical: 'bottom',
    textDecorationLine: 'underline',
    fontSize: 20,
    width: 35,
    height: 30,
    color: 'black',
    backgroundColor: 'ghostwhite',
  },
  spacer: {
    justifyContent: "center",
    textDecorationLine: 'none',
    backgroundColor: 'ghostwhite',
    width: 35,
  },
  buttons: {
    flex: 9,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
    marginTop: 10,
    width: 400,
    backgroundColor: 'dimgrey',
  }
});

export default HomeView;
