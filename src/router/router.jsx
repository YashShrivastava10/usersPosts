import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Users } from '../components/users';
import { Posts } from '../components/posts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/users",
        element: <Users />
      },
      {
        path:"/posts",
        element: <Posts />
      }
    ]
  }
], {basename: "/usersPosts"})

export default router;