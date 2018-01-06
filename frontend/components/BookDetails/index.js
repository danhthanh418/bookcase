import React from 'react';
import { AsyncStorage, Picker, Text, TextInput, View } from 'react-native';
import styles from './styles';


const constants = {
  NOTES_PLACEHOLDER: 'Type your notes here',
};


export default class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: constants.NOTES_PLACEHOLDER,
      readingStatus: props.navigation.state.params.readingStatus,
    };
  }

  componentDidMount() {
    // FIXME: set the key to be book specific
    Object.keys(this.state).forEach((key) => {
      this.fetchData(`@Bookcase:${key}`, key);
    });
  }

  fetchData = async (storeKey, stateKey) => {
    try {
      const value = await AsyncStorage.getItem(storeKey);
      if (value !== null) {
        this.setState({ [stateKey]: value });
      }
    } catch (error) {
      // TODO: error retrieving data, do something
    }
  };

  setData = (storeKey, stateKey, value) => {
    try {
      this.setState({ [stateKey]: value }, async () => {
        await AsyncStorage.setItem(storeKey, value);
      });
    } catch (error) {
      // TODO: error saving data, do something
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.header}>NOTES</Text>
        <TextInput
          style={styles.textInput}
          onFocus={() => {
              if (this.state.notes === constants.NOTES_PLACEHOLDER) {
                this.setState({ notes: '' });
              }
            }
          }
          // FIXME: set the key to be book specific
          onChangeText={notes => this.setData('@Bookcase:notes', 'notes', notes)}
          value={this.state.notes}
          multiline
          numberOfLines={11}
        />
        <Text style={styles.header}>STATUS</Text>
        <Picker
          selectedValue={this.state.readingStatus}
          onValueChange={itemValue => this.setData('@Bookcase:readingStatus', 'readingStatus', itemValue)}
        >
          <Picker.Item label="Unstarted" value="0" />
          <Picker.Item label="Started" value="1" />
          <Picker.Item label="Finished" value="2" />
        </Picker>
      </View>
    );
  }
}
