import React, {useEffect, useState, createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Gallery from './Pages/gallery';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/LogIn/LogInPage';
import Newpage from './Pages/newpage';
import MemberPage from './Components/Member/MemberPage';
import { auth } from './Components/firebase-config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import ProfileInfo from './Components/Member/MemberPageBtns/Profile/ProfileInfo';
import { getDoc, doc, collection, Timestamp } from 'firebase/firestore';
import { db, app } from './Components/firebase-config';
import AvatarUpload from './Components/Member/MemberPageBtns/Profile/AvatarUpload';
import About from './Pages/About';

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
    },
    {
      path: "/about",
      element: <About/>,
    }
  ]
);

const Index = () => {
  // const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [profiles, setProfiles] = useState({
    birth: '',
    name: '',
    gender: '',
  })

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log(user);
              setAuthUser(user);
              const dbRef = doc(db, `${user.uid}`, "avatar");
              const dbProfileRef = doc(db, `${user.uid}`, "profiles")
              const dbCollection = collection(db, `${user.uid}`);
              const getProfiles = async () => {
                const profiles = await getDoc(dbProfileRef);
                if (profiles.exists()) {
                  const ntObject = profiles.data().birth;
                  const name = profiles.data().name;
                  const gender = profiles.data().gender;
                  // const timestamp = Timestamp.fromMillis(ntObject.seconds * 1000 + ntObject.nanoseconds / 1000000);
                  // const birthdate = timestamp.toDate().toLocaleDateString('zh-TW'
                  // ,{year: 'numeric', month: '2-digit', day: '2-digit'});
                  
                  setProfiles({
                    ...profiles,
                    birth: ntObject,
                    name: name,
                    gender: gender,
                  })
                }else {
                  // doc.data() will be undefined in this case
                  setProfiles({});
                  console.log("No such document!");
                }

              }
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
              getProfiles();
            }else {
              setAuthUser(null);
              setAvatarURL(null);
            }
          return () => {
            listen();
            }
            })
    }, [authUser, avatarURL, profiles]);

  const updateNewURL = (newURL) => {
    setAvatarURL(newURL)
  }


  const userSignOut = () => {
      signOut(auth).then(()=> {
        console.log("Logged Out!")
      }).catch(err=> console.log(err))};

  return (
    <UserContext.Provider value={{ authUser, userSignOut, avatarURL, updateNewURL, profiles }}>
      <RouterProvider router={router}></RouterProvider>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index/>
);
reportWebVitals();
