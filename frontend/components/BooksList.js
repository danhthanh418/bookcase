import React from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';


const styles = {
  container: {
    flex: 1,
  },
};

// FIXME: replace by appropriate url
const url = 'https://jsonplaceholder.typicode.com/albums';
var data = [];
fetch(url)
  .then(response => response.json())
  .then(json => {
    json.forEach((item) => {
      data.push({
        id: item.id,
        title: item.title,
      });
    });
  });

const BooksList = props => (
  <View style={styles.container}>
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item }) => (
        <ListItem
          onPress={() => props.navigation.navigate('BookDetails', { title: `${item.title}` })}
          avatar={
            <Avatar
              source={{}}
              containerStyle={{ marginBottom: 2 }}
              avatarStyle={{ resizeMode: 'cover' }}
              width={100}
              height={100}
            />
          }
          title={`${item.title}`}
          subtitle='Author Goeshere'
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
            marginBottom: '5%'
          }}
        />
      )}
    />
  </View>
);

export default BooksList;
