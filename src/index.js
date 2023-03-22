import React, {useEffect, useState, createContext, useMemo} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Gallery from './Pages/gallery';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/LogIn/LogInPage';
import MemberPage from './Components/Member/MemberPage';
import { auth } from './Components/firebase-config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import ProfileInfo from './Components/Member/MemberPageBtns/Profile/ProfileInfo';
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';
import { db, app } from './Components/firebase-config';
import AvatarUpload from './Components/Member/MemberPageBtns/Profile/AvatarUpload';
import ChatRoom from './Pages/ChatRoom';
import Appointment from './Pages/Appointment';
import Pay from './Components/AD/Pay/Pay';
import BookingHistory from './Components/Member/BookingHistory';
import { ChatContextProvider } from './Components/AuthContext/ChatContext';
import BookMark from './Components/Member/BookMark';
import PostsContainer from './Components/AD/ADs/PostsContainer';
import Loader from './Components/Loader/Loader';



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
          path: ":ID",
          element: <PostsContainer/>,
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
          element:<BookingHistory/>,
        },
        {
          path: "updateAvatar",
          element:<AvatarUpload/>,
        },
        {
          path: "SavedPosts",
          element: <BookMark/>,
        }
      ]
    },
    {
      path: "/chatting/*",
      element: <ChatRoom/>,
    },
    {
      path: "/appoint/*",
      element: <Appointment/>,
      children: [
        {
          path: "pay",
          element: <Pay/>,
        }
      ]
    },
  ]
);

const Index = () => {
  const [authUser, setAuthUser] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [profiles, setProfiles] = useState({
    birth: '',
    name: '',
    gender: '',
    email: '',
    avatarURL: '',
    uid: '',
    photographer: '',
  })
  const [postModalOpen, setPostModalOpen] = useState(false)
  const [orders, setOrders] = useState([]);
  const [refreshOrders, setRefreshOrders] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  const handleRefreshOrders = () => {
    setRefreshOrders(!refreshOrders);
  }

  const dbProfileRef = useMemo(() => {
    if (authUser) {
      return doc(db, 'users', `${authUser.uid}`);
    }
    return null;
  }, [authUser]);


  const getOrdersRef = useMemo(() => {
    if (authUser) {
      return collection(db, 'users',`${authUser.uid}`, 'Orders')
    }
    return null;
  }, [authUser, refreshOrders])

  const getOrders = useMemo(async () => {
    if (getOrdersRef) {
      const Orders = await getDocs(getOrdersRef);
      setOrders([]);
      Orders.forEach((doc) => {
        const OrderObject = doc.data().Orders
        setOrders((prevOrders) => [...prevOrders, OrderObject])
      })
    }
    return [];
  }, [getOrdersRef]);
  const getProfiles = useMemo(async () => {
    if (dbProfileRef) {
      const profiles = await getDoc(dbProfileRef);
      if (profiles.exists()) {
        const { birth, name, gender, email, avatarURL, uid, photographer } = profiles.data().Profiles;
        setProfiles(
          {
            birth: birth,
            name: name,
            gender: gender,
            email: email,
            avatarURL: avatarURL,
            uid: uid,
            photographer: photographer,
          }
        )
        setIsLoading(false)
        return { birth, name, gender, email, avatarURL };
      } else {
        setIsLoading(false)
        return {};
      }
    } else {
      setIsLoading(false)
    }
    return null;
  }, [dbProfileRef]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
        setAvatarURL(null);
      }
    });

    if (authUser) {
      const dbRef = doc(db, `${authUser.uid}`, "avatar");
      const getAvatar = async () => {
        const avatarURL = await getDoc(dbRef);
        if (avatarURL.exists()) {
          setAvatarURL(avatarURL.data().avatarURL);
        } else {
          setAvatarURL(null);
        }
      }
      getAvatar();

    }
    return () => {
        listen();
        }
    }, [authUser, avatarURL, getProfiles, getOrders]);

  const updateNewURL = (newURL) => {
    setAvatarURL(newURL)
  }

  const toggleModal = () => {
    setPostModalOpen(!postModalOpen)
  }

  const updateProfiles = (newProfiles) => {
    setProfiles(newProfiles);
  }


  const userSignOut = () => {
      signOut(auth).then(()=> {
      }).catch(err=> console.log(err))};

  return (
    <UserContext.Provider value={{ authUser, userSignOut, avatarURL, updateNewURL, profiles , updateProfiles, orders
      ,handleRefreshOrders, toggleModal, setPostModalOpen, postModalOpen
    }}>
        <ChatContextProvider>
          {isLoading && <Loader></Loader>}
          <RouterProvider router={router}></RouterProvider>
        </ChatContextProvider>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index/>
);
reportWebVitals();
