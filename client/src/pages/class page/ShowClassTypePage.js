import React, { useState, useEffect } from 'react'
import { getClassType } from '../../axios/classType'
import TableHead from '../../components/TableHead';
import TableData from './components/TableData';

const ShowClassTypePage = () => {
    const tableHead = ["Name", "Description", "Action"];
    const [ClassType, setClassType] = useState([])

    useEffect(() => {
        getClassType((result) => setClassType(result))
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64 pt-[85px] h-min">
                {/* Table */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <TableHead
                            tableHead={tableHead}
                        />
                        <TableData
                            data={ClassType}
                        />
                    </table>
                </div>
            </div>
        </>
    )
}

export default ShowClassTypePage