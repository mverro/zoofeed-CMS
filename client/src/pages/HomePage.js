import React, { useEffect } from 'react'

const HomePage = ({ loginStatus, setOnProfile }) => {

    useEffect(() => {
        setOnProfile(false);
    }, []);

    return (
        <div className='flex items-center justify-center pt-60'>homePage</div>
    )
}

export default HomePage