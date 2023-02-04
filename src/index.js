import React, {useEffect, useState, createContext} from 'react';
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
import MemberPage from './Components/Member/MemberPage';
import { auth } from './Components/firebase-config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import ProfileInfo from './Components/Member/MemberPageBtns/Profile/ProfileInfo';


export const UserContext = createContext({});

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
      path: "/member/*",
      element: <MemberPage/>,
      children: [
        {
          path: "profile",
          element:<ProfileInfo/>,
        },
        {
          path: "booking",
          element:<ProfileInfo/>,
        }
      ]
    }
  ]
);

const Index = () => {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
              setAuthUser(user);
            }else {
              setAuthUser(null);
            }
            console.log(user);
          return () => {
            listen();
            }
            })
    }, []);

  const userSignOut = () => {
      signOut(auth).then(()=> {
        console.log("logged out!")
      }).catch(err=> console.log(err))};
  return (
    <UserContext.Provider value={{ authUser, userSignOut }}>
      <RouterProvider router={router}></RouterProvider>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index/>
);
reportWebVitals();
