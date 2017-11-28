import { StackNavigator } from 'react-navigation';
import BooksList from './components/bookslist';
import BookDetails from './components/bookdetails';


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
