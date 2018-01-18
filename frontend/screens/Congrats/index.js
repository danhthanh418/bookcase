import React from 'react';
import { ActivityIndicator, AsyncStorage, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import styles from './styles';

/**
 * Congrats screen displayed on successful book add.
 */
export default class Congrats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: props.initialData || [],
      error: null,
    };
  }

  /**
   *
   */
  redirectToRoute = async () => {
    try {
      this.setState({ loading: true });
      let newBook = this.props.navigation.state.params.item;

      let books = await AsyncStorage.getItem('@Bookcase:books');
      if (books !== null) {
        books = JSON.parse(books);
        let maxKey = Math.max(...books.map(o => parseInt(o.key)));
        if (maxKey < 0) {
          maxKey = 0;
        }
        const newKey = (maxKey + 1).toString();
        newBook.key = newKey;
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
        });

        this.setState({ loading: false });
        this.props.navigation.dispatch(resetAction);
      }
    } catch (error) {
      this.setState({ error, loading: false });
      alert(error);
    }
  }

  /**
   *
   */
  renderLoading = () => {
    return <ActivityIndicator size="large" style={[styles.activityIndicatorContainer, styles.horizontal]} color="#00A885" />;
  };

  /**
   *
   */
  renderCongrats = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Book successfully added!</Text>
        <Button
          onPress={this.redirectToRoute}
          title="Dismiss"
          color="white"
          backgroundColor="#00A885"
          style={styles.button}
        />
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.error) {
      // return this.renderError();
    } else {
      return this.renderCongrats();
    }
  }
}
