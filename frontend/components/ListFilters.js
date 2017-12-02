import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';


const styles = StyleSheet.create({
  header: {
    color: 'gray',
    paddingLeft: 15,
    paddingTop: 30,
    paddingBottom: 10,
  },
  listItem: {
    backgroundColor: 'white',
  },
});

const sectionData = [
  {
    title: 'SORT BY',
    data: [
      { key: 'Date Added (default)' },
      { key: 'Title' },
      { key: 'Author' },
    ],
    key: 'A',
  },
];

export default class ListFilters extends React.Component {
  render() {
    return (
      <SectionList
        renderItem={({ item }) => (
          <ListItem
            containerStyle={styles.listItem}
            title={`${item.key}`}
            titleStyle={{ fontSize: 16 }}
            rightIcon={{ name: 'check', type: 'font-awesome', style: { marginRight: 10, fontSize: 15 } }}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        sections={sectionData}
        keyExtractor={item => item.key}
      />
    );
  }
}
