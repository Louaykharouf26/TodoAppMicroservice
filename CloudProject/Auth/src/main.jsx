import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

import './index.css'
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';

const router = createBrowserRouter([
  {
    path: "/register",
    element: <SignUp/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
