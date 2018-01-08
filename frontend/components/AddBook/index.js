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
    this.state = {
      search: constants.SEARCH_PLACEHOLDER,
      data: [],
      loading: false,
      error: null,
    };
  }

  searchBooks = () => {
    this.setState({ loading: true });

    const q = encodeURI(this.state.search);
    const apiKey = '';  // TODO: fill api key
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json,
          error: json.error || null,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <View>
        <Text style={styles.headline}>Let’s add a book</Text>
        <TextInput
          style={styles.searchBox}
          onFocus={() => {
              this.setState({ search: '' });
            }
          }
          onChangeText={search => this.setState({ search })}
          value={this.state.search}
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
