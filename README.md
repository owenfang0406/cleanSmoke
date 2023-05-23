# ClearSmoke Introduction

<a id="intro"></a>

ClearSmoke is a photographer service provider platform where users can come here to register as a photographer to seek potential clients and vice versa. Furthermore, users can share posts with pics they took here as a social media and users registered as a photographer will be shown a badge when they upload posts so that other users can identify them at the very first glance. When the users are attracted by the post fed by photographers, users can reach out other users or photographers via chatroom and eventually make an appointment for photography through this website.

Project Links: https://clearsome-d2515.web.app/

## Table of Contents

- [Introduction](#intro)
- [Frontend Techniques](#frontendTechniques)
- [Backend Techniques](#backendtechniques)
- [Feature Demo](#featureDemo)

## Main Feature

- Reproduce Instagram-like post interface with React hooks and CSS modules.
- Enable real-time chat and img sending by connecting to Firebase database and storage.
- Create impressive 3D models for landing page with Three.js.
- Responsive Web Design (RWD) for desktop and mobile device.
- Infinite scrolling with intersectionObserver.
- Introduce Debounce and Throttle techniques.

## Frontend Techniques

<a id="frontendTechniques"></a>

## Component Structure

![Component Structure](https://firebasestorage.googleapis.com/v0/b/reactpracticewehelp.appspot.com/o/avatar%2FComponent%20Structure.drawio.png?alt=media&token=c17233e1-495b-48f3-bbb2-17a6922b5287)

- React Router v6.9.0
  - RouterProvider
  - createBrowserRouter
  - Children / Outlet
  - useNavigate
  - useParams
  - Link
- Hook API
  - useContext
  - useReducer
  - useRef
  - useState
  - useEffect
  - useMemo
- React-three/\*

  - /drei

    - PerspectiveCamera
    - RenderTexture
    - Text
    - OrbitControls
    - Stage

  - /fiber
    - useFrame
    - Canvas

## Back-end Techniques (Firebase Cloud Service)

<a id="backendtechniques"></a>

### Firebase Authentication

    * support login and sign up with email and password

### Firebase Database

    * support data in string forms to be collected and accessible by front-end.

### Storage

    * support storing files and images and return a referenced URL.

### Hosting

    * Host static and dynamic contents of the web.

## Feature Demo

<a id="featureDemo"></a>

<img src="src/elements/Demo1.gif" alt="Demo1" style="width:200px; height:500px;">
<img src="src/elements/Demo2.gif" alt="Demo2" style="width:200px; height:500px;">

## Contact

    * Author: Wei-Xiang, Fang
    * Email: ken5475ht@gmail.com
