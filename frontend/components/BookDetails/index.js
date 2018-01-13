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
      key: props.navigation.state.params.key,
      notes: constants.NOTES_PLACEHOLDER,
      readingStatus: props.navigation.state.params.readingStatus,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    // FIXME: this should be probably handled through nav params or props
    try {
      // TODO: handle loading state
      let books = await AsyncStorage.getItem('@Bookcase:books');
      if (books !== null) {
        books = JSON.parse(books);
        const book = books.find((item) => {
          return item.key === this.state.key;
        });
        this.setState({
          notes: book.notes || constants.NOTES_PLACEHOLDER,
          readingStatus: book.readingStatus
        });
      }
    } catch (error) {
      // TODO: error retrieving data, do something
    }
  };

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
        }
      });
    } catch (error) {
      // TODO: error saving data, do something
      alert(error);
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
          <Picker.Item label="Unstarted" value="0" />
          <Picker.Item label="Started" value="1" />
          <Picker.Item label="Finished" value="2" />
        </Picker>
      </View>
    );
  }
}
