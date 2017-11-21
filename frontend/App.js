import React from 'react';
import { TabBarIOS, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';

const styles = {
  container: {
    flex: 1,
  },
};

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{borderBottomWidth: 0.3, borderBottomColor: 'gray'}}
          title={{title: 'Reading List'}}
          tintColor="#F5F5F5"
        />
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
      </View>
    );
  }
}
