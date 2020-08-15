import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DetailsView({route, navigation}) {
  return (
    <View>
      <View>
        <Text style={[styles.address]}>Android Fonts available out of the box:{"\n"}</Text>
        <Text style={[styles.address, {fontFamily: "normal"}]}>  normal  <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
        <Text style={[styles.address, {fontFamily: "notoserif"}]}>  notoserif <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
        <Text style={[styles.address, {fontFamily: 'sans-serif'}]}>  sans-serif <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
        <Text style={[styles.address, {fontFamily: 'sans-serif-light'}]}>  sans-serif-light <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
        <Text style={[styles.address, {fontFamily: 'sans-serif-thin'}]}>  sans-serif-thin <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
        <Text style={[styles.address, {fontFamily: 'sans-serif-condensed'}]}>  sans-serif-condensed <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
        <Text style={[styles.address, {fontFamily: 'sans-serif-medium'}]}>  sans-serif-medium <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
        <Text style={[styles.address, {fontFamily: 'serif'}]}>  serif <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
        <Text style={[styles.address, {fontFamily: 'Roboto'}]}>  Roboto <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
        <Text style={[styles.address, {fontFamily: 'monospace'}]}> monospace <Text style={{fontWeight: "bold"}}>Bold{"\n"}</Text></Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    padding: 10,
    justifyContent: "flex-start",
    backgroundColor: '#e0e0e0',
  },
  addressRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    height: 40,
    justifyContent: "flex-start",
    backgroundColor: '#e0e0e0',
  },
  address: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: 'flex-start',
    // textAlignVertical: 'bottom',
    fontSize: 20,
    // height: '100%',
    color: 'black',
    backgroundColor: '#f5f5f5',
  }
});

export default DetailsView;
