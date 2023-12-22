import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import App from './App.jsx'
import AddTasks from './AddTasks.jsx';
/*import SignUp from '../../Auth/src/SignUp.jsx';
import Login from '../../Auth/src/Login.jsx';*/
import './index.css'
import DoneTasks from './DoneTasks.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/todo",
    element: <AddTasks/>,
  },
  {
    path: "/done",
    element: <DoneTasks/>,
  },
  /*{
    path: "/register",
    element: <SignUp/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },*/
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
