import React, { useState, useEffect } from 'react';
import { readDataAnimal, deleteData } from '../../axios/animal';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import ModalDetail from './components/ModalDetail';
import ModalAdd from './components/ModalAdd';
import Pagination from '../../components/Pagination';
import ModalEdit from './components/ModalEdit';

const ShowAnimalPage = ({ loginStatus }) => {
    const [items, setItems] = useState([]);
    const [id, setId] = useState(0);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [modalCheck, setModalCheck] = useState(false);
    const [changeData, setChangeData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(4);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const lastPostIndex = currentPage * postPerPage;
    const firstPostPostIndex = lastPostIndex - postPerPage;
    const currentPosts = items.slice(firstPostPostIndex, lastPostIndex);

    useEffect(() => {
        readDataAnimal(result => setItems(result));
    }, [changeData])

    const deleteHandler = (id) => {
        deleteData(id, () => setChangeData(!changeData));
    }

    return (
        <>
            <div className='h-[64px]'></div>
            <div className="p-4 sm:ml-64 h-screen dark:bg-gray-900">
                <ModalDetail
                    id={id}
                    modalCheck={modalCheck}
                    showModalDetail={showModalDetail}
                    setShowModalDetail={setShowModalDetail}
                />
                <ModalAdd
                    changeData={changeData}
                    setChangeData={setChangeData}
                    modalCheck={modalCheck}
                    showModalAdd={showModalAdd}
                    setShowModalAdd={setShowModalAdd}
                />
                <ModalEdit
                    id={id}
                    changeData={changeData}
                    setChangeData={setChangeData}
                    modalCheck={modalCheck}
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
                                <input onChange={(e) => setSearch(e.target.value)} type="text" id="simple-search" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                            </div>
                        </form>
                    </div>
                    {/* Button Add */}
                    <button
                        onClick={() => {
                            setShowModalAdd(true);
                            setModalCheck(!modalCheck);
                        }}
                        data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom"
                        type="button"
                        class="focus:outline-none text-white bg-[#019267] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
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
                                currentPosts.filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.name.toLowerCase().includes(search);
                                })
                                    .map((item) => {
                                        return (
                                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                                                                setShowModalDetail(true);
                                                                setId(item.id)
                                                                setModalCheck(!modalCheck);
                                                            }}
                                                        >
                                                            <FaEye size={23} />
                                                        </div>
                                                        <div className='cursor-pointer' onClick={() => {
                                                            setShowModalEdit(true);
                                                            setModalCheck(!modalCheck);
                                                            setId(item.id);
                                                        }}>
                                                            <FaEdit size={23} color={'#19A7CE'} />
                                                        </div>
                                                        <div
                                                            className='cursor-pointer'
                                                            onClick={() => deleteHandler(item.id)}
                                                        >
                                                            <FaTrash size={20} color={'#F15A59'} />
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

export default ShowAnimalPage