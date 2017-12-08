import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


const constants = {
  SEARCH_PLACEHOLDER: 'Search...',
};

const styles = StyleSheet.create({
  headline: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 30,
    marginBottom: 30,
  },
  searchBox: {
    textAlignVertical: 'center',
    backgroundColor: 'white',
    borderColor: '#C7C7C7',
    borderWidth: 1.0,
    color: 'gray',
    fontSize: 16,
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 5,
  },
});

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
