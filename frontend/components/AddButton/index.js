import React from 'react';
import { AsyncStorage, TouchableOpacity, Image, View } from 'react-native';
import styles from './styles';

/**
 * A plus button for adding a new book.
 */
export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  _onPress = async () => {
    try {
      let books = await AsyncStorage.getItem('@Bookcase:books');
      if (books !== null) {
        books = JSON.parse(books);
        const currentIsbns = books.map(book => book.key);

        this.props.navigation.navigate('AddBook', {
          currentIsbns: currentIsbns,
          readingStatus: this.props.navigation.state.routeName,
        })
      }
    } catch (error) {
      this.setState({ error: 'An error occurred while searching for new books' });
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this._onPress}
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
