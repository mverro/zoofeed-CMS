import React from 'react'
import { Outlet } from 'react-router-dom'

const AnimalPage = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    )
}

export default AnimalPage