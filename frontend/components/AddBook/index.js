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
    if (!this.state.search || this.state.search === constants.SEARCH_PLACEHOLDER) {
      return;
    }

    this.setState({ loading: true });

    const q = encodeURI(this.state.search);
    const apiKey = '';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json,
          error: json.error || null,
          loading: false,
        });

        const books = this.getBooks(json);
        this.props.navigation.navigate('BooksList', {
          data: books,
          filterData: false,
          showSearchBar: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
        alert(error);
      });
  };

  getBooks = (json) => {
    let books = [];
    let key = 1;
    for (let item of json["items"]) {
      if (item["kind"] === "books#volume") {
        const volumeInfo = item["volumeInfo"];
        let book = {
          key: key,
          title: volumeInfo["title"],
          authors: volumeInfo["authors"],
          "coverUri": volumeInfo["imageLinks"]["thumbnail"]
        };
        books.push(book);
        key += 1;
        if (key > 10) {
          break;
        }
      }
    }

    return books;
  };

  renderLoading = () => {
    // TODO: use a spinner instead
    return <Text>Loading...</Text>;
  };

  renderAddBook = () => {
    return (
      <View>
        <Text style={styles.headline}>Let’s add a book</Text>
        {this.state.error && <Text style={styles.error}>Loading error! Please try again.</Text>}
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
  };

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else {
      return this.renderAddBook();
    }
  }
}
