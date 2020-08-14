import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './context/auth';
import { FilterProvider } from './context/filter';
import { CommentsProvider } from './context/comments';
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <FilterProvider >
        <CommentsProvider>
          <App />
        </CommentsProvider>
      </FilterProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
