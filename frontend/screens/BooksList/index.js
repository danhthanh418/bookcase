import React from 'react';
import { AsyncStorage, FlatList, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Events from '../../events';
import ErrorView from '../../components/ErrorView';
import LargeActivityIndicator from '../../components/LargeActivityIndicator';
import styles from './styles';


// maps the tabs and their reading status
const tabsReadingStatus = {
  WishListTab: '0',
  ReadingTab: '1',
  BookShelfTab: '2'
};

/**
 * Main component for the app. It shows the list of books and is
 * reused for all the reading statuses.
 */
export default class BooksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: props.initialData || [],
      readingStatus: tabsReadingStatus[props.navigation.state.routeName],
      searchText: '',
      error: null,
    };
  }

  componentDidMount() {
    this.refreshEvent = Events.subscribe('BooksList', (data) => {
      let filteredData = data.filter(book => book.readingStatus === this.state.readingStatus);
      this.setState({ data: filteredData });
    });

    const params = this.props.navigation.state.params;
    if (params && params.data) {
      if (this._isSearchResults()) {
        this.setState({ data: params.data });
      } else {
        const data = params.data.filter(book => book.readingStatus === this.state.readingStatus);
        this.setState({ data });
      }
    } else {
      this.fetchData();
    }
  }

  componentWillUnmount () {
    this.refreshEvent.remove();
  }

  /**
   * Fetches the data (books) from async storage and populates state.
   */
  fetchData = async () => {
    try {
      this.setState({ loading: true });
      let books = await AsyncStorage.getItem('@Bookcase:books');
      if (books !== null) {
        books = JSON.parse(books);
        books = books.filter(book => book.readingStatus === this.state.readingStatus);
        this.setState({ data: books });
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error: 'An error occurred while fetching your data', loading: false });
    }
  };

  /**
   * Adds newBook parameter to AsyncStorage and navigate to Congrats screen.
   */
  addRow = async (newBook) => {
    try {
      this.setState({ loading: true });
      let books = await AsyncStorage.getItem('@Bookcase:books');
      if (books !== null) {
        books = JSON.parse(books);
      } else {
        books = [];
      }
      books.push(newBook);
      await AsyncStorage.setItem('@Bookcase:books', JSON.stringify(books));
      this.setState({ loading: false }, () => {
        this.props.navigation.navigate('Congrats', { data: books });
      });
    } catch (error) {
      this.setState({ error: 'An error occurred while adding a book', loading: false });
    }
  };

  /**
   * Removes the row from the list and deletes its data from the state
   * and from async storage.
   */
  deleteRow = (rowMap, rowKey) => {
    this._closeRow(rowMap, rowKey);

    const newData = [...this.state.data];
    const prevIndex = this.state.data.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);

    try {
      this.setState({data: newData}, async () => {
        await AsyncStorage.setItem('@Bookcase:books', JSON.stringify(newData));
      });
    } catch (error) {
      this.setState({ error: 'An error occurred while deleting a book' });
    }
  };

  /**
   * Closes the row, i.e., removes it from the list.
   */
  _closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  /**
   * Renders the list item, a book with a cover, a title, and authors in our case.
   * Touching a book item leads to the BookDetails screen.
   */
  renderItem = ({item}) => (
    <ListItem
      onPress={() => {
        const params = this.props.navigation.state.params;
        if (this._isSearchResults()) {
          item.readingStatus = tabsReadingStatus[params.readingStatus];
          this.addRow(item);
        } else {
          this.props.navigation.navigate('BookDetails', {
            key: `${item.key}`,
            title: `${item.title}`,
            notes: `${item.notes}`,
            readingStatus: `${item.readingStatus.toString()}`,
          })}
        }
      }
      avatar={
        <Avatar
          source={{uri: `${item.coverUri}`}}
          containerStyle={{ marginBottom: 2 }}
          avatarStyle={{ resizeMode: 'cover' }}
          width={80}
          height={120}
        />
      }
      title={`${item.title}`}
      subtitle={`${item.authors.join(', ')}`}
      titleStyle={{ fontSize: 16 }}
      containerStyle={styles.rowFront}
    />
  );

  /**
   * Filters the data (title and authors of the books) based on the query string.
   */
  filterData = (query, data) => {
    const searchText = this._getNormalizedString(query);
    const readingStatus = this.state.readingStatus;

    if (!searchText) {
      return data;
    }

    return data.filter(item => {
      const title = this._getNormalizedString(item.title);
      const authors = this._getNormalizedString(item.authors.join());
      return title.indexOf(searchText) !== -1 || authors.indexOf(searchText) !== -1;
    });
  };

  _getNormalizedString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  /**
   * Sorts the data in ascending order on parameter property prop.
   */
  sortData = (data, prop) => {
    return data.sort((a, b) => {
      const propA = this._getNormalizedString(a[prop]);
      const propB = this._getNormalizedString(b[prop]);

      if (propA < propB) {
        return -1;
      } else if (propA > propB) {
        return 1;
      }

      return 0;
    });
  };

  /**
   * Renders the loading view.
   */
  renderLoading = () => {
    return <LargeActivityIndicator />;
  };

  /**
   * Renders the error view.
   */
  renderError = () => {
    return <ErrorView error={this.state.error} />;
  };

  /**
   * Helper for returning or not the search bar based on navigation params.
   */
  _getSearchBar = () => {
    if (!this._isSearchResults()) {
      return (
        <SearchBar
          placeholder="Search among your books..."
          onChangeText={text => this.setState({ searchText: text})}
          onClearText={() => this.setState({ searchText: ''})}
          lightTheme
        />
      );
    }
  };

  /**
   * Returns true if this books list is from a search in google books api, false otherwise.
   */
  _isSearchResults = () => {
    const params = this.props.navigation.state.params;
    if (params && params.isSearchResults) {
      return true;
    }

    return false;
  };

  /**
   * Renders the books list using a SwipeListView and thus allowing deletion on swipe right.
   */
  renderList = () => {
    let data;
    if (this._isSearchResults()) {
      data = this.state.data;
    } else {
      data = this.filterData(this.state.searchText, this.state.data);
    }
    data = this.sortData(data, 'title');

    return (
      <View style={styles.container}>
        {this._getSearchBar()}
        <SwipeListView
          useFlatList
          data={data}
          renderItem={this.renderItem}
          renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={styles.deleteRightButton} onPress={ () => this.deleteRow(rowMap, data.item.key) }>
                <Text style={styles.rightButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75}
          onRowDidOpen={this.onRowDidOpen}
        />
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      setTimeout(this.renderLoading, 200);
      return this.renderList();
    } else if (this.state.error) {
      return this.renderError();
    } else {
      return this.renderList();
    }
  }
}
