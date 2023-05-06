import React from 'react'
import { Routes, Route } from 'react-router-dom';
import {
    HomePage,
    AnimalPage,
    ShowAnimalPage,
    FoodPage,
    ShowFoodPage
} from '../pages';

const MainContent = () => {
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
            </Routes>
        </>
    )
}

export default MainContent