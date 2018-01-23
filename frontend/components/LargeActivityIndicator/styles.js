import { StyleSheet } from 'react-native';
import { paddingNormal } from '../../static/styles/common';

export default StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: paddingNormal,
  },
});
