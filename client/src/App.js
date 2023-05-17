import './App.css';
import React, { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import { readDataUser } from './axios/user';
import ProfileSideBar from './components/ProfileSideBar';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userCheck, setUserCheck] = useState(false);
  const [onProfile, setOnProfile] = useState(false);

  const loginCbHandler = (result) => {
    setLoginStatus(result)
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setLoginStatus(true)
      readDataUser(result => setUserData(result))
    } else {
      setLoginStatus(false)
    }
  }, [loginStatus])

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      readDataUser(result => setUserData(result))
    }
  }, [loginStatus])

  return (
    <>
      <div className='fixed top-0 bottom-0 right-0 left-0 dark:bg-slate-900'></div>
      <div className={loginStatus ? '' : 'hidden'}>
        <NavBar
          loginCbHandler={loginCbHandler}
          userData={userData}
          onProfile={onProfile}
          setOnProfile={setOnProfile}
        />
        {
          onProfile
            ? <ProfileSideBar />
            : <SideBar />
        }
      </div>
      <MainContent
        loginStatus={loginStatus}
        loginCbHandler={loginCbHandler}
        userData={userData}
        setUserCheck={setUserCheck}
        userCheck={userCheck}
        onProfile={onProfile}
        setOnProfile={setOnProfile}
      />

    </>
  );
}

export default App;
