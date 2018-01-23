import { StyleSheet } from 'react-native';
import { fontSizeSmall, marginVerticalNormal } from '../../static/styles/common';

export default StyleSheet.create({
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
    fontSize: fontSizeSmall,
    height: 200,
    marginBottom: marginVerticalNormal,
    paddingLeft: 5,
  },
});
