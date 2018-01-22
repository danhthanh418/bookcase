import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import styles from './styles';

/**
 * A plus button for adding a new book.
 */
export default class AddButton extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddBook', {
              readingStatus: this.props.navigation.state.routeName,
            });
          }}
        >
          <Image
            source={require('./../../static/img/plus.png')}
            style={styles.headerLeft}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
