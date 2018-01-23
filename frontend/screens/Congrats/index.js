import React from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { primaryColor } from '../../static/styles/common';
import styles from './styles';

/**
 * Congrats screen displayed on successful book add.
 */
export default class Congrats extends React.Component {
  /**
   * Resets navigation stack and redirects to Root screen.
   */
  redirectToRoot = async () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        {
          type: 'Navigation/INIT',
          routeName: 'Root',
          params: {
            data: this.props.navigation.state.params.data,
            isSearchResults: false,
          }
        }
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Book successfully added!</Text>
        <Button
          onPress={this.redirectToRoot}
          title="Dismiss"
          color="white"
          backgroundColor={primaryColor}
        />
      </View>
    );
  }
}
