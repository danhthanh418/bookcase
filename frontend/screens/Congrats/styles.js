import { StyleSheet } from 'react-native';
import { importantFontSize } from '../../static/styles/common';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    textAlign: 'center',
    fontSize: importantFontSize,
    height: 100,
  },
});
