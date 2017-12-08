import React from 'react';
import { Button, Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import AddBook from './components/AddBook';
import BooksList from './components/BooksList';
import BookDetails from './components/BookDetails';


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
            source={require('./img/list.png')}
            style={{ tintColor: tintColor }}
          />
        ),
        headerBackTitle: 'Back',
        headerLeft: (
          <Button
            title="Add"
            onPress={() => navigation.navigate('AddBook')}
          />
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
            source={require('./img/reading.png')}
            style={{ tintColor: tintColor }}
          />
        ),
        headerBackTitle: 'Back',
        headerLeft: (
          <Button
            title="Add"
            onPress={() => navigation.navigate('AddBook')}
          />
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
            source={require('./img/shelf.png')}
            style={{ tintColor: tintColor }}
          />
        ),
        headerBackTitle: 'Back',
        headerLeft: (
          <Button
            title="Add"
            onPress={() => navigation.navigate('AddBook')}
          />
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
});
