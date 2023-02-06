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
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from './Components/firebase-config';
import AvatarUpload from './Components/Member/MemberPageBtns/Profile/AvatarUpload';

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
        },
        {
          path: "updateAvatar",
          element:<AvatarUpload/>,
        }
      ]
    }
  ]
);

const Index = () => {
  const [authUser, setAuthUser] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);

  // const dbRef = doc(db, `${authUser.email}`, "avatar");
  // const getAvatar = async () => {
  //   const avatarURL = await getDocs(dbRef)
  //   console.log(avatarURL)
  // }
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log(user);
              setAuthUser(user);
              const dbRef = doc(db, `${user.email}`, "avatar");
              const dbCollection = collection(db, `${user.email}`);
              const getAvatar = async () => {
                const avatarURL = await getDoc(dbRef);
                console.dir(avatarURL)
                if (avatarURL.exists()) {
                  setAvatarURL(avatarURL.data().avatarURL);
                  console.log("Document data:", avatarURL.data().avatarURL);
                } else {
                  // doc.data() will be undefined in this case
                  setAvatarURL(null);
                  console.log("No such document!");
                }
              }
              getAvatar();
            }else {
              setAuthUser(null);
              setAvatarURL(null);
            }
          return () => {
            listen();
            }
            })
    }, [authUser, avatarURL]);

  const updateNewURL = (newURL) => {
    setAvatarURL(newURL)
  }

  const userSignOut = () => {
      signOut(auth).then(()=> {
        console.log("logged out!")
      }).catch(err=> console.log(err))};
  return (
    <UserContext.Provider value={{ authUser, userSignOut, avatarURL, updateNewURL }}>
      <RouterProvider router={router}></RouterProvider>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index/>
);
reportWebVitals();
