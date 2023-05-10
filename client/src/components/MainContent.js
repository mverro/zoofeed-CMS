import React from 'react'
import { Routes, Route } from 'react-router-dom';
import {
    HomePage,
    AnimalPage,
    ShowAnimalPage,
    FoodPage,
    ShowFoodPage,
    LoginPage,
    SignUpPage
} from '../pages';

const MainContent = ({
    loginStatus,
    loginCbHandler,
    userData,
    userCheck,
    setUserCheck, }) => {
    return (
        <>
            <Routes>
                <Route path='' element={<HomePage loginStatus={loginStatus} />} />
                <Route path='animals' element={<AnimalPage />}>
                    <Route path='' element={<ShowAnimalPage loginStatus={loginStatus} />}></Route>
                </Route>
                <Route path='foods' element={<FoodPage />}>
                    <Route path='' element={<ShowFoodPage loginStatus={loginStatus} />} />
                </Route>
                <Route path='login' element={<LoginPage loginStatus={loginStatus} loginCbHandler={loginCbHandler} />} />
                <Route path='register' element={<SignUpPage loginCbHandler={loginCbHandler} />} />
            </Routes>
        </>
    )
}

export default MainContent