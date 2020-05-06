import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const Root = () => {
  return <App />;
};

ReactDOM.render(<App />, document.querySelector('#root'));
