import React from 'react';
import { ActivityIndicator } from 'react-native';
import { PRIMARY_COLOR } from '../../styles/common';
import styles from './styles';

/**
 * A large activity indicator centered on the screen.
 */
export default class LargeActivityIndicator extends React.Component {
  render() {
    return <ActivityIndicator size="large" style={[styles.activityIndicatorContainer, styles.horizontal]} color={PRIMARY_COLOR} />;
  }
}
