import React, { useState, useEffect } from 'react'
import { readData, deleteDataF, searchFood } from '../../axios/food'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import Pagination from '../../components/Pagination'
import ModalAdd from './components/ModalAdd'
import ModalDetail from './components/ModalDetail'
import ModalEdit from './components/ModalEdit'
import { FormatRupiah } from "@arismun/format-rupiah";

const ShowFoodPage = ({ loginStatus }) => {
    const [items, setItems] = useState([]);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [id, setId] = useState(0);
    const [detailCheck, setdetailCheck] = useState(false);
    const [editCheck, setEditCheck] = useState(false);
    const [addCheck, setAddCheck] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(4);
    const [search, setSearch] = useState('');
    const [changeData, setChangeData] = useState(false);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostPostIndex = lastPostIndex - postPerPage;
    const currentPosts = items.slice(firstPostPostIndex, lastPostIndex);

    useEffect(() => {
        readData(result => setItems(result));
    }, [changeData])

    const deleteHandler = (id) => {
        deleteDataF(id, () => setChangeData(!changeData));
    }

    const handleFilterChange = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            searchFood(search, (result) => setItems(result));
        }, 500)

        return () => {
            clearTimeout(timeout)
        }

    }, [search]);

    const openEditHandle = (id) => {
        setEditCheck(!editCheck);
        setShowModalEdit(true);
        setId(id);
    }

    return (
        <>
            <div className="p-4 sm:ml-64 pt-[85px] h-min">
                <ModalDetail
                    id={id}
                    detailCheck={detailCheck}
                    showModalDetail={showModalDetail}
                    setShowModalDetail={setShowModalDetail}
                />
                <ModalAdd
                    changeData={changeData}
                    setChangeData={setChangeData}
                    addCheck={addCheck}
                    showModalAdd={showModalAdd}
                    setShowModalAdd={setShowModalAdd}
                />
                <ModalEdit
                    id={id}
                    changeData={changeData}
                    setChangeData={setChangeData}
                    editCheck={editCheck}
                    showModalEdit={showModalEdit}
                    setShowModalEdit={setShowModalEdit}
                />
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
                                <input onChange={handleFilterChange} type="text" id="simple-search" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                            </div>
                        </form>
                    </div>
                    {/* Button Add */}
                    <button
                        onClick={() => {
                            setShowModalAdd(true)
                            setAddCheck(!addCheck);
                        }}
                        type="button"
                        class="relative focus:outline-none text-white bg-[#019267] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentPosts.map((item) => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img
                                                    className="w-8 h-8 rounded-full object-cover"
                                                    src={item.imageUrl}
                                                    alt="user photo"
                                                />
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.type}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.stock}
                                            </td>
                                            <td className="px-6 py-4">
                                                <FormatRupiah value={item.price} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex gap-5'>
                                                    <div className='cursor-pointer' onClick={() => {
                                                        setId(item.id);
                                                        setdetailCheck(!detailCheck);
                                                        setShowModalDetail(true);
                                                    }}>
                                                        <FaEye size={23} />
                                                    </div>
                                                    <div onClick={() => openEditHandle(item.id)} className='cursor-pointer'>
                                                        <FaEdit size={23} color={'#19A7CE'} />
                                                    </div>
                                                    <div
                                                        className='cursor-pointer'
                                                        onClick={() => deleteHandler(item.id)}>
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
                <Pagination
                    totalPosts={items.length}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </>
    )
}

export default ShowFoodPage