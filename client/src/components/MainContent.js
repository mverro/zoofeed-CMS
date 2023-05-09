import React from 'react'
import { Routes, Route } from 'react-router-dom';
import {
    HomePage,
    AnimalPage,
    ShowAnimalPage,
    FoodPage,
    ShowFoodPage,
    LoginPage
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
                <Route path='' element={<HomePage />} />
                <Route path='animals' element={<AnimalPage />}>
                    <Route path='' element={<ShowAnimalPage />}></Route>
                </Route>
                <Route path='foods' element={<FoodPage />}>
                    <Route path='' element={<ShowFoodPage />} />
                </Route>
                <Route path='login' element={<LoginPage loginCbHandler={loginCbHandler} />} />
            </Routes>
        </>
    )
}

export default MainContent