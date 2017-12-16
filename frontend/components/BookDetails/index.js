import React from 'react';
import { Picker, Text, TextInput, View } from 'react-native';
import styles from './styles';


const constants = {
  NOTES_PLACEHOLDER: 'Type your notes here',
};


export default class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.navigation.state.params.notes? props.navigation.state.params.notes : constants.NOTES_PLACEHOLDER,
      readingStatus: props.navigation.state.params.readingStatus,
    };
  }

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
          onChangeText={notes => this.setState({ notes })}
          value={this.state.notes}
          multiline
          numberOfLines={11}
        />
        <Text style={styles.header}>STATUS</Text>
        <Picker
          selectedValue={this.state.readingStatus}
          onValueChange={itemValue => this.setState({ readingStatus: itemValue })}
        >
          <Picker.Item label="Unstarted" value="0" />
          <Picker.Item label="Started" value="1" />
          <Picker.Item label="Finished" value="2" />
        </Picker>
      </View>
    );
  }
}
