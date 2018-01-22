import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

/**
 * Renders the props error on the screen.
 */
export default class ErrorView extends React.Component {
  render() {
    const error = this.props.error || 'Oops! Something went wrong...';
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{error}</Text>
        </View>
    );
  }
}
