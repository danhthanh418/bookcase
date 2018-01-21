import React from 'react';
import { Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import AddBook from './screens/AddBook';
import BooksList from './screens/BooksList';
import BookDetails from './screens/BookDetails';
import Congrats from './screens/Congrats';
import AddButton from './components/AddButton';

/**
 * The tab navigator for the three reading statuses.
 * Is embedded in the stack navigator.
 */
const TabNav = TabNavigator(
  {
    WishListTab: {
      screen: BooksList,
      path: '/list',
      navigationOptions: ({ navigation }) => ({
        title: 'Bookcase',
        tabBarLabel: 'Wish List',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./static/img/list.png')}
            style={{ tintColor: tintColor }}
          />
        ),
        headerBackTitle: 'Back',
        headerLeft: (
          <AddButton navigation={navigation} />
        ),
      }),
    },
    ReadingTab: {
      screen: BooksList,
      path: '/',
      navigationOptions: ({ navigation }) => ({
        title: 'Bookcase',
        tabBarLabel: 'Reading',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./static/img/reading.png')}
            style={{ tintColor: tintColor }}
          />
        ),
        headerBackTitle: 'Back',
        headerLeft: (
          <AddButton navigation={navigation} />
        ),
      }),
    },
    BookShelfTab: {
      screen: BooksList,
      path: '/shelf',
      navigationOptions: ({ navigation }) => ({
        title: 'Bookcase',
        tabBarLabel: 'Book Shelf',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./static/img/shelf.png')}
            style={{ tintColor: tintColor }}
          />
        ),
        headerBackTitle: 'Back',
        headerLeft: (
          <AddButton navigation={navigation} />
        ),
      }),
    },
  },
  {
    initialRouteName: 'ReadingTab',
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
);

/**
 * Stack navigator over tab navigator, i.e., do not show the
 * tabs when one level down or more in the stack.
 */
export default StackNavigator({
  Root: {
    screen: TabNav,
  },
  BooksList: {
    screen: BooksList,
    navigationOptions: {
      title: 'List',
    },
  },
  BookDetails: {
    screen: BookDetails,
    navigationOptions: {
      title: 'Detail',
    },
  },
  AddBook: {
    screen: AddBook,
    navigationOptions: {
      title: 'New Book',
    },
  },
  Congrats: {
    screen: Congrats,
    navigationOptions: {
      title: 'New Book',
      headerLeft: null,
    },
  },
});
