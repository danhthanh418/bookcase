import React from 'react';
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native';


const constants = {
  NOTES_PLACEHOLDER: 'Type your notes here',
};

const styles = StyleSheet.create({
  header: {
    color: 'gray',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: '#C7C7C7',
    borderWidth: 0.5,
    fontSize: 16,
    height: 200,
    marginBottom: 20,
    paddingLeft: 5,
  },
});

export default class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: constants.NOTES_PLACEHOLDER };
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
          onValueChange={(itemValue, itemIndex) => this.setState({ readingStatus: itemValue })}
        >
          <Picker.Item label="Unstarted" value="0" />
          <Picker.Item label="Started" value="1" />
          <Picker.Item label="Finished" value="2" />
        </Picker>
      </View>
    );
  }
}
