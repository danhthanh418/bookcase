import React from 'react';
import { AsyncStorage, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import ErrorView from '../../components/ErrorView';
import LargeActivityIndicator from '../../components/LargeActivityIndicator';
import { primaryColor } from '../../static/styles/common';
import styles from './styles';

const constants = {
  SEARCH_PLACEHOLDER: 'Type your book title...',
  MAX_SEARCH_RESULTS: 20,
  PLACEHOLDER_COVER_URI: 'https://www.bookshare.org/cms/sites/default/files/styles/panopoly_image_original/public/460.png?itok=hObwtU4o',
};

/**
 * Renders the add book screen, essentially a search box and a submit button.
 */
export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: constants.SEARCH_PLACEHOLDER,
      loading: false,
      error: null,
    };
  }

  /**
   * Searches Google books api for the searchText and navigates to
   * a BookList if some results are found.
   */
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
        const books = this.getBooks(json);
        if (books.length > 0) {
          this.setState({ loading: false });
          this.props.navigation.navigate('BooksList', {
            data: books,
            isSearchResults: true,
            readingStatus: this.props.navigation.state.params.readingStatus,
          });
        } else {
          this.setState({ error: 'No result found!', loading: false });
        }
      })
      .catch(error => {
        this.setState({ error: 'An error occurred while searching for new books', loading: false });
      });
  };

  /**
   * Parses the json blob returned by Google books api and returns
   * an array of books objects.
   */
  getBooks = (json) => {
    let books = [];
    const currentIsbns = this.props.navigation.state.params.currentIsbns || [];
    let searchIsbns = [];
    let counter = 0;

    for (let item of json["items"]) {
      if (item["kind"] === "books#volume") {
        const volumeInfo = item["volumeInfo"];
        if (volumeInfo["title"] && volumeInfo["authors"]) {
          const coverUri = this._getCoverUri(volumeInfo);

          const isbn = this._getIsbn13(volumeInfo);
          if (this._isNewIsbn(isbn, searchIsbns, currentIsbns)) {
            let book = {
              key: isbn,
              title: volumeInfo["title"],
              authors: volumeInfo["authors"],
              coverUri: coverUri,
              "notes": "",
              readingStatus: this.props.navigation.state.params.readingStatus,
            };
            books.push(book);
            searchIsbns.push(isbn);
            counter += 1;
            if (counter > constants.MAX_SEARCH_RESULTS) {
              break;
            }
          }
        }
      }
    }

    return books;
  };

  /**
   * Returns the coverUri from volumeInfo if it exists, a placeholder otherwise.
   */
  _getCoverUri = (volumeInfo) => {
    let coverUri = constants.PLACEHOLDER_COVER_URI;
    if (volumeInfo["imageLinks"] && volumeInfo["imageLinks"]["thumbnail"]) {
      coverUri = volumeInfo["imageLinks"]["thumbnail"];
    }

    return coverUri;
  };

  /**
   * Returns the isbn 13 from volumeInfo if it exists, null otherwise.
   */
  _getIsbn13 = (volumeInfo) => {
    if (volumeInfo.hasOwnProperty('industryIdentifiers')) {
      const industryIdentifiers = volumeInfo['industryIdentifiers'];
      const isbn_13 = industryIdentifiers.filter(identifier => identifier.type === 'ISBN_13');
      if (isbn_13.length === 1) {
        return isbn_13[0]['identifier'];
      }
    }

    return null;
  };

  /**
   * Returns whether the isbn is new or not.
   * A new isbn is not in the previous search results nor in the current
   * list of books.
   */
  _isNewIsbn = (isbn, searchIsbns, currentIsbns) => {
    if (isbn && searchIsbns && currentIsbns) {
      if (searchIsbns.indexOf(isbn) === -1 && currentIsbns.indexOf(isbn) === -1) {
        return true;
      }
    }

    return false;
  };

  /**
   * Renders the loading view.
   */
  renderLoading = () => {
    return <LargeActivityIndicator />
  };

  /**
   * Renders the error view.
   */
  renderError = () => {
    return <ErrorView error={this.state.error} />
  };

  /**
   * Renders a search box and a submit button for adding a book.
   */
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
          backgroundColor={primaryColor}
        />
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.error) {
      return this.renderError();
    } else {
      return this.renderAddBook();
    }
  }
}
