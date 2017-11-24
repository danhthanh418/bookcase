import React from 'react';
import { FlatList, TabBarIOS, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Cell, Separator, TableView } from 'react-native-tableview-simple';

const styles = {
  container: {
    flex: 1,
  },
};

const data = [
  { id: 1, title: '1' },
  { id: 2, title: '2' },
  { id: 3, title: '3' },
  { id: 4, title: '4' },
  { id: 5, title: '5' },
  { id: 6, title: '6' },
  { id: 7, title: '7' },
  { id: 8, title: '8' },
  { id: 9, title: '9' },
  { id: 10, title: '10' },
  { id: 11, title: '11' },
  { id: 12, title: '12' },
];

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
