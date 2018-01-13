import React from 'react';
import { AsyncStorage, FlatList, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './styles';


// maps the tabs and their reading status
const tabsReadingStatus = {
  WishListTab: '0',
  ReadingTab: '1',
  BookShelfTab: '2'
};

const json = [
  {
    "key": "1",
    "coverUri": "http://books.google.com/books/content?id=wgg7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "title": "Learning React Native",
    "authors": [
        "Bonnie Eisenman"
    ],
    "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    "rating": null,
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
    "rating": null,
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
    "rating": 5,
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
    "rating": null,
    "readingStatus": '1'
  },
];

export default class BooksList extends React.Component {
  constructor(props) {
    super(props);

    // TODO: remove this line, just there for testing with initial data
    AsyncStorage.setItem('@Bookcase:books', JSON.stringify(json));

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
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    /*
    TODO: uncomment and change the url

    const url = 'https://jsonplaceholder.typicode.com/albums';
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json,
          error: json.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
      */

    this.setState({ loading: false, error: false });
    this.setState({ data: json });
  };

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  deleteRow = (rowMap, rowKey) => {
    this.closeRow(rowMap, rowKey);
    const newData = [...this.state.data];
    const prevIndex = this.state.data.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    // TODO: delete data from Async Storage
    this.setState({data: newData});
  };

  renderItem = ({item}) => (
    <ListItem
      onPress={() => this.props.navigation.navigate('BookDetails', {
        key: `${item.key}`,
        title: `${item.title}`,
        notes: `${item.notes}`,
        readingStatus: `${item.readingStatus.toString()}`
      })}
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

  filterData = (query, data) => {
    const searchText = this.getNormalizedString(query);
    const readingStatus = this.state.readingStatus;
    const dataInTabs = data.filter(item => item.readingStatus === readingStatus);

    if (!searchText) {
      return dataInTabs;
    }

    return dataInTabs.filter(item => {
      const title = this.getNormalizedString(item.title);
      const authors = this.getNormalizedString(item.authors.join());
      return title.indexOf(searchText) !== -1 || authors.indexOf(searchText) !== -1;
    });
  };

  getNormalizedString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  sortData = (data) => {
    return data.sort((a, b) => {
      const titleA = this.getNormalizedString(a.title);
      const titleB = this.getNormalizedString(b.title);

      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      }

      return 0;
    });
  };

  renderLoading = () => {
    // TODO: use a spinner instead
    return <Text>Loading...</Text>;
  };

  renderError = () => {
    // TODO: add some style and a refresh button
    return <Text>Loading error! Please try again.</Text>;
  };

  getSearchBar = () => {
    if (this.props.showSearchBar) {
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

  renderList = () => {
    const filteredData = this.filterData(this.state.searchText, this.state.data);
    const filteredAndSortedData = this.sortData(filteredData);
    const searchBar = this.getSearchBar();

    return (
      <View style={styles.container}>
        {searchBar}
        <SwipeListView
          useFlatList
          data={filteredData}
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

BooksList.defaultProps = {
  showSearchBar: true,
};
