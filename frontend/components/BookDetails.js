import React from 'react';
import { Text } from 'react-native';


const BookDetails = props => (
  <Text>Item title: {props.navigation.state.params.title}</Text>
);

export default BookDetails;
