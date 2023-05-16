import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../axios/user'
import TableHead from '../../components/TableHead';
import TableData from './components/TableData';

const ShowUserPage = () => {
    const tableHead = ['Name', 'Email', 'Role', 'Action'];
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getAllUser((result) => setDatas(result));
    })
    return (
        <>
            <div className="p-4 sm:ml-64 h-min pt-[85px]">
                {/* Table */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <TableHead
                            tableHead={tableHead}
                        />
                        <TableData
                            user={datas}
                        />
                    </table>
                </div>
            </div>
        </>
    )
}

export default ShowUserPage