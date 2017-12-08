import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';


export default class AddButton extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddBook') }}>
          <Image
            source={require('../img/plus.png')}
            style={{
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
