import React, { useState, useEffect } from 'react';
import { readDataAnimal, deleteData, searchAnimal } from '../../axios/animal';
import ModalDetail from './components/ModalDetail';
import ModalAdd from './components/ModalAdd';
import Pagination from '../../components/Pagination';
import ModalEdit from './components/ModalEdit';
import { userLike, userUnlike, getLikeData } from '../../axios/animalUser';
import TableData from './components/TableData';
import Table from '../../components/Table';
import Search from '../../components/Search';
import Button from '../../components/Button';


const ShowAnimalPage = ({ loginStatus }) => {
    const [items, setItems] = useState([]);
    const [id, setId] = useState(0);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [updateLike, setUpdateLike] = useState(false);
    const [modalCheck, setModalCheck] = useState(false);
    const [changeData, setChangeData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [likeData, setLikeData] = useState([]);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostPostIndex = lastPostIndex - postPerPage;
    const currentPosts = items.slice(firstPostPostIndex, lastPostIndex);

    const tHead = ['ID', 'Name', 'Sex', 'Age', 'Check', 'Action'];

    const animalChecked = (id) => {
        userLike(id, () => setUpdateLike(!updateLike))
    }

    const animalUnchecked = (id) => {
        userUnlike(id, () => setUpdateLike(!updateLike));
    }

    const deleteHandler = (id) => {
        deleteData(id, () => setChangeData(!changeData));
    }

    const handleFilterChange = (event) => {
        setSearch(event.target.value);
    };

    const handleAdd = () => {
        setShowModalAdd(true);
        setModalCheck(!modalCheck);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            searchAnimal(search, (result) => setItems(result));
        }, 500)

        return () => {
            clearTimeout(timeout)
        }

    }, [search]);

    useEffect(() => {
        readDataAnimal(result => setItems(result));
    }, [changeData])

    useEffect(() => {
        getLikeData((result) => setLikeData(result));
    }, [updateLike])

    const tBody = <TableData
        setId={setId}
        likeData={likeData}
        currentPosts={currentPosts}
        animalChecked={animalChecked}
        animalUnchecked={animalUnchecked}
        deleteHandler={deleteHandler}
        modalCheck={modalCheck}
        setModalCheck={setModalCheck}
        setShowModalDetail={setShowModalDetail}
        setShowModalEdit={setShowModalEdit}
        setShowModalAdd={setShowModalAdd}
    />

    return (
        <>
            <div className="p-4 sm:ml-64 pt-[85px] h-min">
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
                    <Search
                        handleFilterChange={handleFilterChange}
                    />
                    <Button
                        handleAdd={handleAdd}
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

export default ShowAnimalPage