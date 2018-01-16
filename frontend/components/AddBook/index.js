import React from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';


const constants = {
  SEARCH_PLACEHOLDER: 'Type your book title...',
  MAX_SEARCH_RESULTS: 20,
  PLACEHOLDER_COVER_URI: 'https://www.bookshare.org/cms/sites/default/files/styles/panopoly_image_original/public/460.png?itok=hObwtU4o',
};

export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: constants.SEARCH_PLACEHOLDER,
      searchResults: [],
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
    const apiKey = 'AIzaSyBc8kuSGIGTNpGt6MIjkvMERNHGF-fedjU';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          searchResults: json,
          error: json.error || null,
          loading: false,
        });

        const books = this.getBooks(json);
        this.props.navigation.navigate('BooksList', {
          searchResults: books,
          filterData: false,
          showSearchBar: false,
          searchResults: true,
          readingStatus: this.props.navigation.state.params.readingStatus,
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

        if (volumeInfo["title"] && volumeInfo["authors"]) {
          let coverUri = constants.PLACEHOLDER_COVER_URI;
          if (volumeInfo["imageLinks"] && volumeInfo["imageLinks"]["thumbnail"]) {
            coverUri = volumeInfo["imageLinks"]["thumbnail"];
          }

          let book = {
            key: key,
            title: volumeInfo["title"],
            authors: volumeInfo["authors"],
            coverUri: coverUri,
            "notes": "",
            readingStatus: this.props.navigation.state.params.readingStatus,
          };
          books.push(book);
          key += 1;
          if (key > constants.MAX_SEARCH_RESULTS) {
            break;
          }
        }
      }
    }

    return books;
  };

  renderLoading = () => {
    return <ActivityIndicator size="large" style={[styles.container, styles.horizontal]} color="#00A885" />
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
