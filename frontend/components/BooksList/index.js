import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import styles from './styles';


// maps the tabs and their reading status
const tabsReadingStatus = {
  WishListTab: 0,
  ReadingTab: 1,
  BookShelfTab: 2
};

export default class BooksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
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
    const json = [
      {
        "id": 1,
        "title": "Learning React Native",
        "authors": [
            "Bonnie Eisenman"
        ],
        "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        "rating": null,
        "reading_status": 0
      },
      {
        "id": 2,
        "title": "Two Scoops of Django 1.11",
        "authors": [
            "Audrey Roy Greenfeld",
            "Daniel Roy Greenfeld"
        ],
        "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        "rating": null,
        "reading_status": 2
      },
      {
        "id": 3,
        "title": "Clean Code",
        "authors": [
            "Robert C. Martin",
            "Dean Wampler"
        ],
        "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        "rating": 5,
        "reading_status": 2
      },
      {
        "id": 4,
        "title": "Hands-On Machine Learning with Scikit-Learn and TensorFlow",
        "authors": [
            "Aurélien Géron"
        ],
        "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        "rating": null,
        "reading_status": 1
      },
    ]
    this.setState({ data: json });
  };

  renderItem = ({item}) => (
    <ListItem
      onPress={() => this.props.navigation.navigate('BookDetails', {
        id: `${item.id}`,
        title: `${item.title}`,
        notes: `${item.notes}`,
        readingStatus: `${item.reading_status.toString()}`
      })}
      avatar={
        <Avatar
          source={{}}
          containerStyle={{ marginBottom: 2 }}
          avatarStyle={{ resizeMode: 'cover' }}
          width={80}
          height={120}
        />
      }
      title={`${item.title}`}
      subtitle={`${item.authors.join(', ')}`}
      titleStyle={{ fontSize: 16 }}
      containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
    />
  );

 renderItemSeparatorComponent = () => (
    <View
      style={{
        height: 0.5,
        width: '95%',
        backgroundColor: '#CED0CE',
        marginLeft: '5%',
        marginBottom: '5%',
      }}
    />
  );

  renderListHeaderComponent = () => (
    <SearchBar
      placeholder="Search among your books..."
      onChangeText={(text) => this.setState({ searchText: text})}
      onClearText={() => this.setState({ searchText: ''})}
      lightTheme
    />
  );

  filterData = (query, data) => {
    const searchText = this.getNormalizedString(query);
    const readingStatus = this.state.readingStatus;
    const dataInTabs = data.filter(item => item.reading_status === readingStatus);

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

  renderList = () => {
    const filteredData = this.filterData(this.state.searchText, this.state.data);
    const filteredAndSortedData = this.sortData(filteredData);
    return (
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListHeaderComponent={this.renderListHeaderComponent}
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
