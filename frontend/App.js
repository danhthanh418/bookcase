import { StackNavigator } from 'react-navigation';
import BooksList from './components/BooksList';
import BookDetails from './components/BookDetails';


export default StackNavigator({
  BooksList: {
    screen: BooksList,
    navigationOptions: {
      title: 'List',
      headerBackTitle: 'Back',
    },
  },
  BookDetails: {
    screen: BookDetails,
    navigationOptions: {
      title: 'Detail',
    },
  },
});
