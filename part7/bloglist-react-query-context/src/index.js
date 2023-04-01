import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { NotificationContextProvider } from './contexts/NotificationContext';
import { UserContextProvider } from './contexts/UserContext';
import { BlogsContextProvider } from './contexts/BlogsContext';
import { UsersContextProvider } from './contexts/UsersContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <UsersContextProvider>
      <UserContextProvider>
        <BlogsContextProvider>
          <App />
        </BlogsContextProvider>
      </UserContextProvider>
    </UsersContextProvider>
  </NotificationContextProvider>
);

