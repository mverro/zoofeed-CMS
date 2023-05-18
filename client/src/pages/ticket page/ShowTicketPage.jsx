import React, { useState, useEffect } from "react";
import { getTicket } from "../../axios/ticket";
import ModalEdit from './components/ModalEdit';
import Table from '../../components/Table';
import TableData from "./components/TableData";

const ShowPaymentPage = () => {
  const [ticket, setTicket] = useState([]);
  const [id, setId] = useState(0);
  const [changeData, setChangeData] = useState(false);
  const [modalCheck, setModalCheck] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const tHead = ['Ticket ID', 'Category', 'Stock', 'Price', 'Action']

  const editHandler = (id) => {
    setShowModalEdit(true);
    setModalCheck(!modalCheck);
    setId(id);
  }

  useEffect(() => {
    getTicket((result) => setTicket(result));
  }, [changeData]);

  const tBody = <TableData
    ticket={ticket}
    editHandler={editHandler}
  />

  return (
    <>
      <ModalEdit
        id={id}
        changeData={changeData}
        setChangeData={setChangeData}
        modalCheck={modalCheck}
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
      />
      <div className="p-4 sm:ml-64 h-min pt-[85px]">
        {/* Table */}
        <Table
          tHead={tHead}
          tBody={tBody}
        />
      </div>
    </>
  );
};

export default ShowPaymentPage;
