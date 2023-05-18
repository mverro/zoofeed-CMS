import React, { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard';
import { FaStickerMule, FaApple, FaUser } from 'react-icons/fa'
import { readDataAnimal } from '../axios/animal';
import { readData } from '../axios/food';
import { getAllUser } from '../axios/user';

const HomePage = ({ loginStatus, setOnProfile }) => {
    const [animals, setAnimals] = useState([])
    const [foods, setFoods] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        setOnProfile(false);
        readDataAnimal((result) => setAnimals(result))
        readData((result) => setFoods(result))
        getAllUser((result) => setUsers(result))
    }, []);

    const items = [
        {
            icon: <FaStickerMule size={50} color={'white'} />,
            count: animals.length,
            label: 'Animals',
            color: 'bg-blue-400'
        },
        {
            icon: <FaApple size={50} color={'white'} />,
            count: foods.length,
            label: 'Foods',
            color: 'bg-red-400'
        },
        {
            icon: <FaUser size={50} color={'white'} />,
            count: users.length,
            label: 'Users',
            color: 'bg-green-400'
        },
    ]

    return (
        <div className="p-4 sm:ml-64 pt-[85px] h-min">
            <div className='flex flex-wrap gap-3'>
                {
                    items.map((item) => {
                        return (
                            <DashboardCard
                                icon={item.icon}
                                count={item.count}
                                label={item.label}
                                color={item.color}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HomePage