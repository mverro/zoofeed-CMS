import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = ({ loginStatus }) => {
    const navigate = useNavigate();

    const isLogin = () => {
        if (loginStatus === false) {
            navigate('/login')
        }
    }

    useEffect(() => {
        isLogin();
    }, [])
    return (
        <div className='flex items-center justify-center pt-60'>homePage</div>
    )
}

export default HomePage