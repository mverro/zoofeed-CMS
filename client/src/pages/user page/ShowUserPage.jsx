import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../axios/user'
import Table from '../../components/Table';
import TableHead from '../../components/TableHead';
import TableData from './components/TableData';

const ShowUserPage = () => {
    const tableHead = ['Name', 'Email', 'Role', 'Action'];
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getAllUser((result) => setDatas(result));
    })

    const tBody = <TableData
        user={datas}
    />
    return (
        <>
            <div className="p-4 sm:ml-64 h-min pt-[85px]">
                <Table
                    tHead={tableHead}
                    tBody={tBody}
                />
            </div>
        </>
    )
}

export default ShowUserPage