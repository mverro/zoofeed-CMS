import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = ({ loginStatus }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginStatus) {
            navigate('/login')
        }
    }, [])
    return (
        <div className='flex items-center justify-center pt-60'>homePage</div>
    )
}

export default HomePage