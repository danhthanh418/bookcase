import React from 'react';
import { Text } from 'react-native';


export default class BookDetails extends React.Component {
  render() {
    const { navigate, state: { params } } = this.props.navigation;
    return (
      <Text>Item title: {params.title}</Text>
    );
  }
}
