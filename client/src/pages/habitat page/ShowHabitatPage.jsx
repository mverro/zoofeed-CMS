import React, { useEffect, useState } from 'react'
import { getHabitat } from '../../axios/habitat';
import Table from '../../components/Table';
import TableData from './components/TableData';
import ModalDetail from './components/ModalDetail';

const ShowHabitatPage = () => {
    const tableHead = ["Name", "Description", "action"];
    const [habitat, setHabitat] = useState([]);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [id, setId] = useState(null)
    const [modalCheck, setModalCheck] = useState(false)

    useEffect(() => {
        getHabitat((result) => setHabitat(result));
    }, [])

    const detailHandle = (id) => {
        setShowModalDetail(true);
        setId(id);
        setModalCheck(!modalCheck);
    }

    const tBody = <TableData
        habitat={habitat}
        detailHandle={detailHandle}
    />

    return (
        <>
            <ModalDetail
                id={id}
                showModalDetail={showModalDetail}
                setShowModalDetail={setShowModalDetail}
                modalCheck={modalCheck}
            />
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