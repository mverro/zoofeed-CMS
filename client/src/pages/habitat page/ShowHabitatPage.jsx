import React, { useEffect, useState } from 'react'
import { getHabitat } from '../../axios/habitat';
import Table from '../../components/Table';
import TableHead from '../../components/TableHead';
import TableData from './components/TableData';

const ShowHabitatPage = () => {
    const tableHead = ["Name", "Description", "action"];
    const [habitat, setHabitat] = useState([]);

    useEffect(() => {
        getHabitat((result) => setHabitat(result));
    }, [])

    const tBody = <TableData
        habitat={habitat}
    />

    return (
        <>
            <div className="p-4 sm:ml-64 h-min pt-[85px]">
                {/* Table */}
                <Table
                    tHead={tableHead}
                    tBody={tBody}
                />
            </div>
        </>
    )
}

export default ShowHabitatPage