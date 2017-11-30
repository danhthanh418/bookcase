import React from 'react';
import { Text, TextInput, View } from 'react-native';


const constants = {
  NOTES_PLACEHOLDER: 'Type your notes here',
};

export default class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: constants.NOTES_PLACEHOLDER };
  }

  render() {
    return (
      <View>
        <Text
          style={{
            paddingLeft: 15,
            paddingTop: 10,
            paddingBottom: 10,
            color: 'gray',
          }}
        >
          NOTES
        </Text>
        <TextInput
          style={{
            height: 200,
            backgroundColor: 'white',
            borderColor: '#C7C7C7',
            borderWidth: 0.5,
            fontSize: 16,
          }}
          onFocus={() => {
              if (this.state.text === constants.NOTES_PLACEHOLDER) {
                this.setState({ text: '' });
              }
            }
          }
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          multiline
          numberOfLines={11}
        />
      </View>
    );
  }
}
