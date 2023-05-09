import React, { useState, useEffect } from 'react'
import { readData } from '../../axios/food'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ShowFoodPage = ({ loginStatus }) => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!loginStatus) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        readData(result => setItems(result));
    }, [items.name])
    return (
        <>
            <div className='h-[64px]'></div>
            <div className="p-4 sm:ml-64 h-screen dark:bg-gray-900">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item) => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                <img
                                                    className="w-8 h-8 rounded-full object-cover"
                                                    src={item.imageUrl}
                                                    alt="user photo"
                                                />
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.type}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex gap-5'>
                                                    <div className='cursor-pointer'>
                                                        <FaEye size={23} />
                                                    </div>
                                                    <div>
                                                        <FaEdit size={23} color={'#19A7CE'} />
                                                    </div>
                                                    <div>
                                                        <FaTrash size={20} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ShowFoodPage