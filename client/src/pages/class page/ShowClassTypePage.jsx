import React, { useState, useEffect } from 'react'
import { getClassType } from '../../axios/classType'
import Table from '../../components/Table';
import TableHead from '../../components/TableHead';
import TableData from './components/TableData';

const ShowClassTypePage = () => {
    const tableHead = ["Name", "Description", "Action"];
    const [ClassType, setClassType] = useState([])

    useEffect(() => {
        getClassType((result) => setClassType(result))
    }, [])

    const tBody = <TableData
        data={ClassType}
    />
    return (
        <>
            <div className="p-4 sm:ml-64 pt-[85px] h-min">
                {/* Table */}
                <Table
                    tHead={tableHead}
                    tBody={tBody}
                />
            </div>
        </>
    )
}

export default ShowClassTypePage