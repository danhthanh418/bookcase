import React from 'react';
import { FlatList, TabBarIOS, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Cell, Separator, TableView } from 'react-native-tableview-simple';

const styles = {
  container: {
    flex: 1,
  },
};

// FIXME: replace by appropriate url
const url = "https://jsonplaceholder.typicode.com/users";
var data = [];
fetch(url)
  .then(response => response.json())
  .then(json => {
      json.forEach((user) => {
          data.push({
              id: user.id,
              title: user.username,
          });
      });
  });

const leftButtonConfig = {
  title: "Add",
  handler: () => alert("TODO: add"),
};

const rightButtonConfig = {
  title: "Filter",
  handler: () => alert("TODO: filter"),
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
          tintColor="#F5F5F5"
          title={{title: "Reading List"}}
          leftButton={leftButtonConfig}
          rightButton={rightButtonConfig}
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
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, separators }) =>
              <Cell
                title={item.title}
                onPress={console.log}
                onHighlightRow={separators.highlight}
                onUnHighlightRow={separators.unhighlight}
              />}
            ItemSeparatorComponent={({ highlighted }) =>
              <Separator isHidden={highlighted} />}
          />
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
