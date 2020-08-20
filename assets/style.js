import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const myColors = { 
  primaryColor: '#1565c0',
  primaryLightColor: '#5e92f3',
  primaryDarkColor: '#003c8f',
  secondaryColor: '#ffff8d',
  secondaryLightColor: '#e3f2fd',
  secondaryDarkColor: '#bbdefb',
  primaryTextColor: '#ffffff',
  secondaryTextColor: '#000000'
  }
  
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    //padding: 10,
    justifyContent: "flex-start",
    backgroundColor: myColors.primaryDarkColor,
  },
  addressRow: {
    flexDirection: "row",
    //flexWrap: "nowrap",
    height: 30,
    justifyContent: "flex-start",
    backgroundColor: myColors.secondaryLightColor,
  },
  address: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: 'center',
    textAlignVertical: 'bottom',
    fontSize: 18,
    //fontWeight: "bold",
    fontFamily: "Roboto",
    //height: '100%',
    color: myColors.secondaryTextColor,
    backgroundColor: myColors.secondaryLightColor,
  },
  textInput: {
    color: myColors.secondaryTextColor,
    textDecorationLine: 'underline',
  },
  spacer: {
    textDecorationLine: 'none',
    backgroundColor: myColors.secondaryLightColor,
  },
  decal: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:myColors.secondaryLightColor,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: 'flex-end',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: "Roboto",
    backgroundColor: myColors.secondaryLightColor,
  }
});