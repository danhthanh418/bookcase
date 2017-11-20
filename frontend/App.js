import React from 'react';
import { TabBarIOS, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Wish List">
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Reading">
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Bookshelf">
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
