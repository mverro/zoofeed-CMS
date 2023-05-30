import React, { useState, useEffect } from 'react'
import { getClassType } from '../../axios/classType'
import Table from '../../components/Table';
import TableData from './components/TableData';
import ModalDetail from './components/ModalDetail';

const ShowClassTypePage = () => {
    const [id, setId] = useState(0)
    const tableHead = ["Name", "Description", "Action"];
    const [ClassType, setClassType] = useState([])
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [modalCheck, setModalCheck] = useState(false);

    useEffect(() => {
        getClassType((result) => setClassType(result))
    }, [])

    const detailHandle = (id) => {
        setShowModalDetail(true);
        setId(id);
        setModalCheck(!modalCheck);
    }

    const tBody = <TableData
        data={ClassType}
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