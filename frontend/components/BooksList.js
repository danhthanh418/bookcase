import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';


const styles = {
  container: {
    flex: 1,
  },
};

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
          "id": 3,
          "title": "Hands-On Machine Learning with Scikit-Learn and TensorFlow",
          "authors": [
              "Aurélien Géron"
          ],
          "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
          "rating": null,
          "reading_status": 1
      },
      {
          "id": 4,
          "title": "Two Scoops of Django 1.11",
          "authors": [
              "Audrey Roy Greenfeld",
              "Daniel Roy Greenfeld"
          ],
          "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
          "rating": null,
          "reading_status": 2
      },
    ]
    this.setState({ data: json });
  };

  renderItem = ({item}) => (
    <ListItem
      onPress={() => this.props.navigation.navigate('BookDetails', {
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
      subtitle={`${item.authors}`}
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

  render() {
    const filteredList = this.state.data.filter(item => item.reading_status === this.state.readingStatus);
    return (
      <View style={styles.container}>
        <FlatList
          data={filteredList}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListHeaderComponent={this.renderListHeaderComponent}
        />
      </View>
    );
  }
}
