import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      octet1: '192',
      octet2: '168',
      octet3: '0',
      octet4: '1'
    };
    this.buildInput = this.buildInput.bind(this);
  }

  buildInput(props) {
    if (props) {
      console.log(`state = ${JSON.stringify(this.state)}`);
      const octet = props.position;
      const starter = props.placeholder;
      return (
        <View style={styles.octetView}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ octet })}
            maxLength={3}
            keyboardType='numeric'
            placeholder={starter}
          />
        </View>
      );
    }
    return <View><Text>HomeView Default</Text></View>;
  }

  render() {
    console.log(`state = ${JSON.stringify(this.state)}`);
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 900, height: 100 }}>
        {this.buildInput({ position: 'octet1', placeholder: this.state.octet1 })}
        {this.buildInput({ position: 'octet2', placeholder: this.state.octet2 })}
        {this.buildInput({ position: 'octet3', placeholder: this.state.octet3 })}
        {this.buildInput({ position: 'octet4', placeholder: this.state.octet4 })}
        <Button
          mode="contained" icon="sitemap"
          onPress={() => this.props.navigation.navigate("Details")}>
            Details
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    color: '#04194e',
    borderColor: '#2657d3',
    borderWidth: 1,
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'right'  

  },
  octetView: {
    height: 40,
    width: 50
  }
});
export default HomeView;