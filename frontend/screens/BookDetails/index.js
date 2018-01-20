import React from 'react';
import { AsyncStorage, Picker, Text, TextInput, View } from 'react-native';
import Events from '../../events';
import styles from './styles';


const constants = {
  NOTES_PLACEHOLDER: 'Type your notes here',
};

/**
 * Renders the book details screen. Shows the notes and reading status
 * of the book.
 */
export default class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.navigation.state.params.key,
      notes: constants.NOTES_PLACEHOLDER,
      readingStatus: props.navigation.state.params.readingStatus,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({
      key: this.props.navigation.state.params.key,
      notes: this.props.navigation.state.params.notes || constants.NOTES_PLACEHOLDER,
      readingStatus: this.props.navigation.state.params.readingStatus,
    });
  }

  /**
   * Updates the state and pushes the changes to AsyncStorage.
   */
  setData = (notes, readingStatus) => {
    try {
      this.setState({ notes, readingStatus }, async () => {
        let books = await AsyncStorage.getItem('@Bookcase:books');
        if (books !== null) {
          books = JSON.parse(books);
          for (let book of books) {
            if (book.key === this.state.key) {
              book.notes = notes;
              book.readingStatus = readingStatus;
              break;
            }
          }
          await AsyncStorage.setItem('@Bookcase:books', JSON.stringify(books));
          Events.publish('BooksList', books);
        }
      });
    } catch (error) {
      // TODO: add something saying that we could not save the change
      this.setState({ error })
    }
  };

  /**
   * Clears the notes state if they contain the placeholder.
   */
  _clearNotesPlaceholder = () => {
    if (this.state.notes === constants.NOTES_PLACEHOLDER) {
      this.setState({ notes: '' });
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.header}>NOTES</Text>
        <TextInput
          style={styles.textInput}
          onFocus={() => this._clearNotesPlaceholder()}
          onChangeText={notes => this.setData(notes, this.state.readingStatus)}
          value={this.state.notes}
          multiline
          numberOfLines={11}
        />
        <Text style={styles.header}>STATUS</Text>
        <Picker
          selectedValue={this.state.readingStatus}
          onValueChange={itemValue => this.setData(this.state.notes, itemValue.toString())}
        >
          <Picker.Item label="Wish List" value="0" />
          <Picker.Item label="Reading" value="1" />
          <Picker.Item label="Book Shelf" value="2" />
        </Picker>
      </View>
    );
  }
}
