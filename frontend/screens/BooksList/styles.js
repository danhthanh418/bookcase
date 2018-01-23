import { StyleSheet } from 'react-native';
import { marginVerticalNormal } from '../../static/styles/common';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  rightButtonText: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    marginBottom: marginVerticalNormal,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  deleteRightButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    bottom: 0,
    justifyContent: 'center',
    marginBottom: marginVerticalNormal,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 75,
    height: 120,
  },
});
