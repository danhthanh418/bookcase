import { StyleSheet } from 'react-native';
import { borderWidthSmall, fontSizeSmall, marginVerticalNormal, paddingSmall, paddingNormal, paddingBig } from '../../static/styles/common';

export default StyleSheet.create({
  header: {
    color: 'gray',
    paddingLeft: paddingBig,
    paddingTop: paddingNormal,
    paddingBottom: paddingNormal,
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: '#C7C7C7',
    borderWidth: borderWidthSmall,
    fontSize: fontSizeSmall,
    height: 200,
    marginBottom: marginVerticalNormal,
    paddingLeft: paddingSmall,
  },
});
