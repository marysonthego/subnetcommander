import * as React from 'react';
import { View, Text } from 'react-native';

function DetailsView({route, navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

export default DetailsView;