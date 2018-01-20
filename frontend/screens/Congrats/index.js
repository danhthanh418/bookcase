import React from 'react';
import { ActivityIndicator, AsyncStorage, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../styles/common';
import styles from './styles';

/**
 * Congrats screen displayed on successful book add.
 */
export default class Congrats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: props.initialData || [],
      error: null,
    };
  }

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
            filterData: this.props.navigation.state.params.books,
          }
        }
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  /**
   * Renders the loading state.
   */
  renderLoading = () => {
    return <ActivityIndicator size="large" style={[styles.activityIndicatorContainer, styles.horizontal]} color={PRIMARY_COLOR} />;
  };

  /**
   * Renders a simple screen with a text and a dismiss button.
   */
  renderCongrats = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Book successfully added!</Text>
        <Button
          onPress={this.redirectToRoot}
          title="Dismiss"
          color="white"
          backgroundColor={PRIMARY_COLOR}
        />
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.error) {
      // return this.renderError();
    } else {
      return this.renderCongrats();
    }
  }
}
