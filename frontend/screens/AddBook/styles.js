import { StyleSheet } from 'react-native';
import { fontSizeSmall, fontSizeNormal, fontSizeBig, marginHorizontalSmall, marginVerticalBig } from '../../static/styles/common';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  headline: {
    textAlign: 'center',
    fontSize: fontSizeBig,
    marginTop: marginVerticalBig,
    marginBottom: marginVerticalBig,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: fontSizeNormal,
    marginTop: marginVerticalBig,
    marginBottom: marginVerticalBig,
  },
  searchBox: {
    textAlignVertical: 'center',
    backgroundColor: 'white',
    borderColor: '#C7C7C7',
    borderWidth: 1.0,
    color: 'gray',
    fontSize: fontSizeSmall,
    height: 40,
    marginLeft: marginHorizontalSmall,
    marginRight: marginHorizontalSmall,
    paddingLeft: 5,
  },
});
