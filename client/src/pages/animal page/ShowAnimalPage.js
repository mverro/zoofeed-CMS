import React, { useState, useEffect } from 'react'
import { readDataAnimal } from '../../axios/animal'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import Modal from './components/Modal'

const ShowAnimalPage = () => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(0);
    const [detailCheck, setdetailCheck] = useState(false)

    useEffect(() => {
        readDataAnimal(result => setItems(result));
    }, [items.name])
    return (
        <>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                id={id}
                detailCheck={detailCheck}
            />
            <div className='h-[64px]'></div>
            <div className="p-4 sm:ml-64 h-screen dark:bg-gray-900">
                {/* Search Bar */}
                <div className=' flex flex-wrap justify-between py-5'>
                    {/* Search */}
                    <div className="container w-80">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="simple-search" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                            </div>
                        </form>
                    </div>
                    {/* Button Add */}
                    <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
                </div>
                {/* Table */}
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
                                                            setdetailCheck(!detailCheck);
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