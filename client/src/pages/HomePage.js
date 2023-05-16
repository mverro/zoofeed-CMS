import React, { useEffect } from 'react'

const HomePage = ({ loginStatus, setOnProfile }) => {

    useEffect(() => {
        setOnProfile(false);
    }, []);

    return (
        <div className="p-4 sm:ml-64 pt-[85px] h-min">
            <div>
                HOME
            </div>
        </div>
    )
}

export default HomePage