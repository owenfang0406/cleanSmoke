import React, {useEffect, useState, createContext, useMemo} from 'react';
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
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';
import { db, app } from './Components/firebase-config';
import AvatarUpload from './Components/Member/MemberPageBtns/Profile/AvatarUpload';
import About from './Pages/About';
import Appointment from './Pages/Appointment';
import Pay from './Components/AD/Pay/Pay';
import BookingHistory from './Components/Member/BookingHistory';

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
          element:<BookingHistory/>,
        },
        {
          path: "updateAvatar",
          element:<AvatarUpload/>,
        }
      ]
    },
    {
      path: "/about/*",
      element: <About/>,
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
  // const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [profiles, setProfiles] = useState({
    birth: '',
    name: '',
    gender: '',
  })
  const [orders,setOrders] = useState([]);
  const [refreshOrders, setRefreshOrders] = useState(false)
  const handleRefreshOrders = () => {
    setRefreshOrders(!refreshOrders);
  }

  const dbProfileRef = useMemo(() => {
    if (authUser) {
      return doc(db, `${authUser.uid}`, "profiles");
    }
    return null;
  }, [authUser]);


  const getOrdersRef = useMemo(() => {
    if (authUser) {
      return doc(db,`${authUser.uid}`, "Orders" )
    }
    return null;
  }, [authUser, refreshOrders])

  const getOrders = useMemo(async () => {
    if (getOrdersRef) {
      const Orders = await getDoc(getOrdersRef);
      if(Orders.exists()) {
        const orderList = Orders.data().Orders;
        setOrders(orderList)
        console.log(orderList)
        return orderList
      }else {
        console.log("No such document!");
        return [];
      }
    }
    return [];
  },
    [getOrdersRef]);

  const getProfiles = useMemo(async () => {
    if (dbProfileRef) {
      const profiles = await getDoc(dbProfileRef);
      if (profiles.exists()) {
        const { birth, name, gender } = profiles.data();
        console.log(birth, name, gender);
        setProfiles(
          {
            birth: birth,
            name: name,
            gender: gender,
          }
        )
        return { birth, name, gender };
      } else {
        console.log("No such document!");
        return {};
      }
    }
    return null;
  }, [dbProfileRef]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      console.log("UseEffectStart")
      console.log("useEffectauthUser"+authUser);
      console.log("useEffectavatarURL"+avatarURL);
      console.log("useEffectprofiles"+profiles)
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
          console.log("No such document!");
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

  const updateProfiles = (newProfiles) => {
    setProfiles(newProfiles);
    console.log(newProfiles);
  }


  const userSignOut = () => {
      signOut(auth).then(()=> {
        console.log("Logged Out!")
      }).catch(err=> console.log(err))};

  return (
    <UserContext.Provider value={{ authUser, userSignOut, avatarURL, updateNewURL, profiles , updateProfiles, orders
      ,handleRefreshOrders
    }}>
      <RouterProvider router={router}></RouterProvider>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index/>
);
reportWebVitals();
