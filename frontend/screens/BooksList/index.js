import React from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Events from '../../events';
import styles from './styles';


// maps the tabs and their reading status
const tabsReadingStatus = {
  WishListTab: '0',
  ReadingTab: '1',
  BookShelfTab: '2'
};

/**
 *
 */
export default class BooksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: props.initialData || [],
      error: null,
      refreshing: false,
      readingStatus: tabsReadingStatus[props.navigation.state.routeName],
      searchText: '',
    };
  }

  componentDidMount() {
    this.refreshEvent = Events.subscribe('BooksList', (data) => this.refreshData(data));

    if (this.props.navigation.state.params && this.props.navigation.state.params.data) {
      this.setState({ data: this.props.navigation.state.params.data });
    } else if (this.props.navigation.state.params && this.props.navigation.state.params.filterData) {
      const data = this.props.navigation.state.params.filterData.filter((book) => book.readingStatus === this.state.readingStatus);
      this.setState({ data });
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
        books = books.filter((book) => book.readingStatus === this.state.readingStatus);
        this.setState({ data: books, loading: false });
      }
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  /**
   *
   */
  refreshData = (data) => {
    let filteredData = data.filter((book) => book.readingStatus === this.state.readingStatus);
    this.setState({ data: filteredData });
  };

  addRow = async (item) => {
    this.props.navigation.navigate('Congrats', {
      item: item
    });
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
      this.setState({ error });
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
        if (this.props.navigation.state.params && this.props.navigation.state.params.searchResults) {
          item.readingStatus = tabsReadingStatus[this.props.navigation.state.params.readingStatus];
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
   * Renders the loading state.
   */
  renderLoading = () => {
    return <ActivityIndicator size="large" style={[styles.activityIndicatorContainer, styles.horizontal]} color="#00A885" />;
  };

  /**
   * Renders the error state.
   */
  renderError = () => {
    // TODO: add some style and a refresh button
    return <Text>Loading error! Please try again.</Text>;
  };

  /**
   * Helper for returning or not the search bar based on navigation params.
   */
  _getSearchBar = () => {
    if (!this.props.navigation.state.params || (this.props.navigation.state.params && this.props.navigation.state.params.filterData)) {
      return (
        <SearchBar
          placeholder="Search among your books..."
          onChangeText={(text) => this.setState({ searchText: text})}
          onClearText={() => this.setState({ searchText: ''})}
          lightTheme
        />
      );
    }
  };

  /**
   * Renders the books list using a SwipeListView and thus allowing deletion on swipe right.
   */
  renderList = () => {
    let data;
    if (this.props.navigation.state.params && !this.props.navigation.state.params.filterData) {
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
      return this.renderLoading();
    } else if (this.state.error) {
      return this.renderError();
    } else {
      return this.renderList();
    }
  }
}
