import React, { useState, useEffect } from 'react'
import { readDataAnimal } from '../../axios/animal'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import Modal from './components/Modal'

const ShowAnimalPage = () => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        readDataAnimal(result => setItems(result));
    }, [items.name])
    return (
        <>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                id={id}
            />
            <div className='h-[64px]'></div>
            <div className="p-4 sm:ml-64 h-screen dark:bg-gray-900">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sex
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Age
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
                                            <th scope="row" className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img
                                                    className="w-8 h-8 rounded-full object-cover"
                                                    src={item.imageUrl}
                                                    alt="user photo"
                                                />
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.sex}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.age}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex gap-3'>
                                                    <div
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            setShowModal(true);
                                                            setId(item.id)
                                                        }}
                                                    >
                                                        <FaEye size={23} />
                                                    </div>
                                                    <FaEdit size={23} color={'#19A7CE'} />
                                                    <FaTrash size={20} />
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

export default ShowAnimalPage