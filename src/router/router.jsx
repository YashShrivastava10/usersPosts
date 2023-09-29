import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Users } from '../components/users';
import { Posts } from '../components/posts';

const router = createBrowserRouter([
  {
    path: "/usersPosts",
    element: <App />,
    errorElement: <App />,
    children: [
      {
        path:"/usersPosts/users",
        element: <Users />
      },
      {
        path:"/usersPosts/posts",
        element: <Posts />
      }
    ]
  }
])

export default router;