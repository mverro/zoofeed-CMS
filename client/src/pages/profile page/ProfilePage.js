import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const ProfilePage = ({ setOnProfile }) => {
    useEffect(() => {
        setOnProfile(true);
    }, [])
    return (
        <div><Outlet></Outlet></div>
    )
}

export default ProfilePage