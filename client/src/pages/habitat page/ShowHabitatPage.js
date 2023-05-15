import React, { useEffect, useState } from 'react'
import { getHabitat } from '../../axios/habitat';
import TableHead from '../../components/TableHead';
import TableData from './components/TableData';

const ShowHabitatPage = () => {
    const tableHead = ["Name", "Description", "action"];
    const [habitat, setHabitat] = useState([]);

    useEffect(() => {
        getHabitat((result) => setHabitat(result));
    }, [])

    return (
        <>
            <div className='h-[64px]'></div>
            <div className="p-4 sm:ml-64 h-screen dark:bg-gray-900">
                {/* Table */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <TableHead
                            tableHead={tableHead}
                        />
                        <TableData
                            habitat={habitat}
                        />
                    </table>
                </div>
            </div>
        </>
    )
}

export default ShowHabitatPage