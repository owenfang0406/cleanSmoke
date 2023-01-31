import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Gallery from './Pages/gallery';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './Components/SignUp/SignUp';
import LogIn from './Components/LogIn/LogInButton';
import SignIn from './Components/LogIn/LogInPage';
import Newpage from './Pages/newpage';
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "/gallery/*",
      element: <Gallery/>,
      children: [
        {
          path: "next",
          element: <Newpage/>,
        },
      ],
    },
    {
      path: "/login",
      element: <SignIn/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    },
    {
      path: "/gallery/future",
      element: <LogIn/>
    }
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}></RouterProvider>
);

reportWebVitals();
