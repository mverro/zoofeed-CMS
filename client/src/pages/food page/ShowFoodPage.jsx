import React, { useState, useEffect } from 'react'
import { readData, deleteDataF, searchFood } from '../../axios/food'
import Pagination from '../../components/Pagination'
import ModalAdd from './components/ModalAdd'
import ModalDetail from './components/ModalDetail'
import ModalEdit from './components/ModalEdit'
import Table from '../../components/Table'
import TableData from './components/TableData'
import Search from '../../components/Search'
import Button from '../../components/Button'

const ShowFoodPage = ({ loginStatus }) => {
    const tHead = ['Name', 'Type', 'Stock', 'Price', 'Action'];
    const [items, setItems] = useState([]);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [id, setId] = useState(0);
    const [detailCheck, setdetailCheck] = useState(false);
    const [editCheck, setEditCheck] = useState(false);
    const [addCheck, setAddCheck] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [changeData, setChangeData] = useState(false);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostPostIndex = lastPostIndex - postPerPage;
    const currentPosts = items.slice(firstPostPostIndex, lastPostIndex);

    useEffect(() => {
        readData(result => setItems(result));
    }, [changeData])

    const handleFilterChange = (event) => {
        setSearch(event.target.value);
    };

    const detailHandler = (id) => {
        setId(id);
        setdetailCheck(!detailCheck);
        setShowModalDetail(true);
    }

    const editHandler = (id) => {
        setEditCheck(!editCheck);
        setShowModalEdit(true);
        setId(id);
    }

    const deleteHandler = (id) => {
        deleteDataF(id, () => setChangeData(!changeData));
    }

    const addHandler = () => {
        setShowModalAdd(true)
        setAddCheck(!addCheck);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            searchFood(search, (result) => setItems(result));
        }, 500)

        return () => {
            clearTimeout(timeout)
        }

    }, [search]);

    const tBody = <TableData
        currentPosts={currentPosts}
        deleteHandler={deleteHandler}
        detailHandler={detailHandler}
        editHandler={editHandler}
    />

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
                    <Search
                        handleFilterChange={handleFilterChange}
                    />
                    {/* Button Add */}
                    <Button
                        onClick={addHandler}
                    />
                </div>
                <Table
                    tHead={tHead}
                    tBody={tBody}
                />
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