import React from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';


export default class Congrats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: props.initialData || [],
      error: null,
    };
  }

  redirectToRoute = async () => {
    try {
      // this.setState({ loading: true });
      let newBook = this.props.navigation.state.params.item;

      let books = await AsyncStorage.getItem('@Bookcase:books');
      if (books !== null) {
        books = JSON.parse(books);
        const maxKey = Math.max(...books.map(o => o.key));
        newBook.key = (maxKey + 1).toString();
        books.push(newBook);
        await AsyncStorage.setItem('@Bookcase:books', JSON.stringify(books));
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
                 {
                        type: 'Navigation/INIT',
                        routeName: 'Root',
                        params: {
                           filterData: books,
                        }
                  }
             ]
        })

        this.props.navigation.dispatch(resetAction);
      }
    } catch (error) {
      // this.setState({ error, loading: false });
      alert(error);
    }
  }

  render() {
    return (
      <View>
        <Text>Congrats</Text>
        <Button
          onPress={this.redirectToRoute}
          title="Dismiss"
          color="white"
          backgroundColor="#00A885"
        />
      </View>
    );
  }
}
