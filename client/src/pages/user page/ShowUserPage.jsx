import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../axios/user'
import Table from '../../components/Table';
import TableData from './components/TableData';
import Pagination from '../../components/Pagination';

const ShowUserPage = () => {
    const tableHead = ['Name', 'Email', 'Role'];
    const [datas, setDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostPostIndex = lastPostIndex - postPerPage;
    const currentPosts = datas.slice(firstPostPostIndex, lastPostIndex);

    useEffect(() => {
        getAllUser((result) => setDatas(result));
    }, [])

    const tBody = <TableData
        user={currentPosts}
    />
    return (
        <>
            <div className="p-4 sm:ml-64 h-min pt-[85px]">
                <Table
                    tHead={tableHead}
                    tBody={tBody}
                />
                <Pagination
                    totalPosts={datas.length}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </>
    )
}

export default ShowUserPage