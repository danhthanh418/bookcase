import { StyleSheet } from 'react-native';
import { fontSizeBig, marginHorizontalSmall } from '../../static/styles/common';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: marginHorizontalSmall,
    marginRight: marginHorizontalSmall,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeBig,
  },
});
