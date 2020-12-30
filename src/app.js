import * as React from 'react';
import { Provider } from 'react-redux';
import ContentScreen from './containers/contentScreen/contentScreen';
import store from './store';
import './style.css';

export default class App extends React.Component {
  render() {
    return (<Provider store={store}>
      <ContentScreen />
    </Provider>);
  }
}
