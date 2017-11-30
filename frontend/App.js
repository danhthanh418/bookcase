import React from 'react';
import { Image, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import BooksList from './components/BooksList';
import BookDetails from './components/BookDetails';


const MyTextScreen = () => (
  <Text>Hello world</Text>
);

const TabNav = TabNavigator(
  {
    WishListTab: {
      screen: MyTextScreen,
      path: '/list',
      navigationOptions: {
        title: 'Bookcase',
        tabBarLabel: 'Wish List',
        tabBarIcon: () => (
          <Image
            source={require('./img/list.png')}
          />
        ),
        headerBackTitle: 'Back',
      },
    },
    ReadingTab: {
      screen: BooksList,
      path: '/',
      navigationOptions: {
        title: 'Bookcase',
        tabBarLabel: 'Reading',
        tabBarIcon: () => (
          <Image
            source={require('./img/reading.png')}
          />
        ),
        headerBackTitle: 'Back',
      },
    },
    BookShelfTab: {
      screen: MyTextScreen,
      path: '/shelf',
      navigationOptions: {
        title: 'Bookcase',
        tabBarLabel: 'Book Shelf',
        tabBarIcon: () => (
          <Image
            source={require('./img/shelf.png')}
          />
        ),
        headerBackTitle: 'Back',
      },
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
});
