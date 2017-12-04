import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';


const styles = {
  container: {
    flex: 1,
  },
};

export default class BooksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
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
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => this.props.navigation.navigate('BookDetails', { title: `${item.title}` })}
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
              subtitle="Author Goeshere"
              titleStyle={{ fontSize: 16 }}
              containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
            />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                width: '95%',
                backgroundColor: '#CED0CE',
                marginLeft: '5%',
                marginBottom: '5%',
              }}
            />
          )}
        />
      </View>
    );
  }
}
