import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';


const constants = {
  SEARCH_PLACEHOLDER: 'Search...',
};

export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: constants.SEARCH_PLACEHOLDER };
  }

  render() {
    return (
      <View>
        <Text style={styles.headline}>Let’s add a book</Text>
        <TextInput
          style={styles.searchBox}
          onFocus={() => {
              this.setState({ text: '' });
            }
          }
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
      </View>
    );
  }
}
