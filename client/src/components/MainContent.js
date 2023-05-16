import React from 'react'
import { Routes, Route } from 'react-router-dom';
import {
    HomePage,
    AnimalPage,
    ShowAnimalPage,
    FoodPage,
    ShowFoodPage,
    LoginPage,
    SignUpPage,
    ClassTypePage,
    ShowClassTypePage,
    PaymentPage,
    ShowPaymentPage,
    HabitatPage,
    ShowHabitatPage,
    ProfilePage,
    UserInfoPage,
    TicketPage,
    ShowTicketPage,
    UserTicketPage,
    ShowUserTicketPage,
    AnimalCarePage,
    UserPage,
    ShowUserPage
} from '../pages';

const MainContent = ({
    loginStatus,
    loginCbHandler,
    onProfile,
    setOnProfile,
    userData,
    userCheck,
    setUserCheck, }) => {
    return (
        <>
            <Routes>
                <Route path='' element={
                    <HomePage
                        loginStatus={loginStatus}
                        setOnProfile={setOnProfile}
                    />} />
                <Route path='login' element={
                    <LoginPage
                        loginStatus={loginStatus}
                        loginCbHandler={loginCbHandler}
                    />} />
                <Route path='register' element={<SignUpPage loginCbHandler={loginCbHandler} />} />
                <Route path='animals' element={<AnimalPage />}>
                    <Route path='' element={<ShowAnimalPage loginStatus={loginStatus} />}></Route>
                </Route>
                <Route path='foods' element={<FoodPage />}>
                    <Route path='' element={<ShowFoodPage loginStatus={loginStatus} />} />
                </Route>
                <Route path='classType' element={<ClassTypePage />}>
                    <Route path='' element={<ShowClassTypePage />}></Route>
                </Route>
                <Route path='habitat' element={<HabitatPage />}>
                    <Route path='' element={<ShowHabitatPage />}></Route>
                </Route>
                <Route path='transaction' element={<PaymentPage />}>
                    <Route path='' element={<ShowPaymentPage />}></Route>
                </Route>
                <Route path='ticket' element={<TicketPage />}>
                    <Route path='' element={<ShowTicketPage />}></Route>
                </Route>
                <Route path='userTicket' element={<UserTicketPage />}>
                    <Route path='' element={<ShowUserTicketPage />}></Route>
                </Route>
                <Route path='profile' element={
                    <ProfilePage
                        setOnProfile={setOnProfile}
                    />}>
                    <Route path='' element={
                        <UserInfoPage
                            userData={userData}
                        />}></Route>
                    <Route path='animals-care' element={<AnimalCarePage />} />
                </Route>
                <Route path='profile' element={
                    <ProfilePage
                        setOnProfile={setOnProfile}
                    />}>
                    <Route path='' element={
                        <UserInfoPage
                            userData={userData}
                        />}></Route>
                </Route>
                <Route path='users' element={<UserPage />}>
                    <Route path='' element={<ShowUserPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default MainContent