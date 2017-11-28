import React from 'react';
import { FlatList, TabBarIOS, Text, View } from 'react-native';
import { Cell, Separator } from 'react-native-tableview-simple';


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
    json.forEach((item) => {
      data.push({
          id: item.id,
          title: item.username,
      });
    });
  });

export default class BooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'reading'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS selectedTab={this.state.selectedTab}>
          <TabBarIOS.Item
            selected={this.state.selectedTab === "list"}
            title="Wish List"
            icon={require("../img/list.png")}
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
            icon={require("../img/reading.png")}
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
                onPress={() => this.props.navigation.navigate('BookDetails', {title: `${item.title}`})}
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
            icon={require("../img/shelf.png")}
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
