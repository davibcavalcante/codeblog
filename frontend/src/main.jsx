import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProfileResume from './components/Profile/ProfileResume';
import ProfilePosts from './components/Profile/ProfilePosts';
import ProfileRepositories from './components/Profile/ProfileRepositories';
import ProfileSaved from './components/Profile/ProfileSaved';
import ProfileLikes from './components/Profile/ProfileLikes';

import Error from './pages/Error';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'profile',
        element: <Profile/>,
        children: [
          {
            index: true,
            element: <ProfileResume/>
          },

          {
            path: 'posts',
            element: <ProfilePosts/>
          },
          {
            path: 'repositories',
            element: <ProfileRepositories/>
          },
          {
            path: 'saved',
            element: <ProfileSaved/>
          },
          {
            path: 'likes',
            element: <ProfileLikes/>
          }
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
