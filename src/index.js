import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Gallery from './Pages/gallery';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "/gallery",
      element: <Gallery/>,
    },
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}></RouterProvider>
);

reportWebVitals();
