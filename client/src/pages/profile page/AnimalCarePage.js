import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { getLikeData } from '../../axios/animalUser'

const AnimalCarePage = () => {
    const [likeData, setLikeData] = useState([])

    useEffect(() => {
        getLikeData((result) => setLikeData(result));
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64 pt-[85px] h-screen dark:bg-gray-900 flex flex-wrap gap-3">
                <Card
                    likeData={likeData}
                />
            </div>
        </>
    )
}

export default AnimalCarePage