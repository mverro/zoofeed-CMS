import './App.css';
import React, { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import { readDataUser } from './axios/user';

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [userData, setUserData] = useState([])
  const [userCheck, setUserCheck] = useState(false);

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
  }, [userCheck])

  return (
    <>
      <div className={loginStatus ? '' : 'hidden'}>
        <NavBar loginCbHandler={loginCbHandler} />
        <SideBar />
      </div>
      <MainContent
        loginStatus={loginStatus}
        loginCbHandler={loginCbHandler}
        userData={userData}
        setUserCheck={setUserCheck}
        userCheck={userCheck}
      />
    </>
  );
}

export default App;
