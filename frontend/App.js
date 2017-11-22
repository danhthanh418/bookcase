import React from 'react';
import { TabBarIOS, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';


const styles = {
  container: {
    flex: 1,
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'reading'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{borderBottomWidth: 0.3, borderBottomColor: "gray"}}
          title={{title: "Reading List"}}
          tintColor="#F5F5F5"
        />
        <TabBarIOS selectedTab={this.state.selectedTab}>
          <TabBarIOS.Item
            selected={this.state.selectedTab === "list"}
            title="Wish List"
            icon={require("./img/list.png")}
            onPress={() => {
              this.setState({
                selectedTab: 'list'
              });
            }}>
          <Text>TODO: Wish list view</Text>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === "reading"}
            title="Reading"
            icon={require("./img/reading.png")}
            onPress={() => {
              this.setState({
                selectedTab: 'reading'
              });
            }}>
          <Text>TODO: Reading view</Text>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === "shelf"}
            title="Bookshelf"
            icon={require("./img/shelf.png")}
            onPress={() => {
              this.setState({
                selectedTab: 'shelf'
              });
            }}>
          <Text>TODO: Bookshelf view</Text>
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}
