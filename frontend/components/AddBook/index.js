import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';


const constants = {
  SEARCH_PLACEHOLDER: 'Type your book title...',
};

export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: constants.SEARCH_PLACEHOLDER };
  }

  searchBooks = () => {
    // TODO: implement this to display results
    alert(this.state.text);
  };

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
        <Button
          onPress={this.searchBooks}
          title="Search Books"
          color="white"
          backgroundColor="#00A885"
        />
      </View>
    );
  }
}
