import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home-page';
import "./base-styles.scss";
import { UsersContextProvider } from './contexts/users-context';

function App() {
  return (
    <UsersContextProvider>
      <HomePage />
    </UsersContextProvider>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
