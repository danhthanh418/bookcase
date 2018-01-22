import { StyleSheet } from 'react-native';
import { importantFontSize } from '../../static/styles/common';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: importantFontSize,
  },
});
