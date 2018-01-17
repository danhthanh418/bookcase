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

const initialData = [
  {
    "key": "1",
    "coverUri": "http://books.google.com/books/content?id=wgg7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "title": "Learning React Native",
    "authors": [
        "Bonnie Eisenman"
    ],
    "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    "readingStatus": '0'
  },
  {
    "key": "2",
    "coverUri": "https://www.bookshare.org/cms/sites/default/files/styles/panopoly_image_original/public/460.png?itok=hObwtU4o",
    "title": "Two Scoops of Django 1.11",
    "authors": [
        "Audrey Roy Greenfeld",
        "Daniel Roy Greenfeld"
    ],
    "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    "readingStatus": '2'
  },
  {
    "key": "3",
    "coverUri": "http://books.google.com/books/content?id=_i6bDeoCQzsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "title": "Clean Code",
    "authors": [
        "Robert C. Martin",
        "Dean Wampler"
    ],
    "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    "readingStatus": '2'
  },
  {
    "key": "4",
    "coverUri": "http://books.google.com/books/content?id=bRpYDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "title": "Hands-On Machine Learning with Scikit-Learn and TensorFlow",
    "authors": [
        "Aurélien Géron"
    ],
    "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    "readingStatus": '1'
  },
];

/**
 *
 */
export default class BooksList extends React.Component {
  constructor(props) {
    super(props);

    // NOTE: remove this line to get rid of the initial data
    AsyncStorage.setItem('@Bookcase:books', JSON.stringify(initialData));

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
    // TODO: add at specific position
    // try {
    //   this.setState({ loading: true });
    //   let books = await AsyncStorage.getItem('@Bookcase:books');
    //   if (books !== null) {
    //     books = JSON.parse(books);
    //     const maxKey = Math.max(...books.map(o => o.key));
    //     item.key = (maxKey + 1).toString();
    //     const readingStatus = tabsReadingStatus[this.props.navigation.state.params.readingStatus];
    //     item.readingStatus = readingStatus;
    //     let filteredBooks = books.filter((book) => book.readingStatus === readingStatus);
    //     filteredBooks.push(item);
    //     books.push(item);
    //     try {
    //       this.setState({data: filteredBooks, loading: false}, async () => {
    //         await AsyncStorage.setItem('@Bookcase:books', JSON.stringify(books));
    //       });
    //     } catch (error) {
    //       // TODO: error saving data, do something
    //       alert(error);
    //     }
    //   }
    // } catch (error) {
    //   this.setState({ error, loading: false });
    // }
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
      // TODO: error saving data, do something
      alert(error);
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
   *
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
            refreshData: this.refreshData
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
   *
   */
  getSearchBar = () => {
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
   *
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
        {this.getSearchBar()}
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
