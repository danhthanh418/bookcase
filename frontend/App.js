import React from 'react';
import { TabBarIOS, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Wish List"
          icon={require('./img/list.png')}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Reading"
          icon={require('./img/reading.png')}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Bookshelf"
          icon={require('./img/shelf.png')}>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
