import React, { useState, useEffect } from "react";
import {
  getUserTicket,
  updateUserTicket,
  userTicketFiltered,
} from "../../axios/userTicket";
import Pagination from "../../components/Pagination";
import { CiBarcode } from "react-icons/ci";
import ModalEdit from "./components/ModalEdit";
import Search from '../../components/Search';
import TableData from "./components/TableData";
import Table from "../../components/Table";

const ShowUserTicketPage = () => {
  const [ticket, setTicket] = useState([]);
  const [changeData, setChangeData] = useState(false);
  const [update, setUpdate] = useState({
    id: 0,
  });
  const [userName, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostPostIndex = lastPostIndex - postPerPage;
  const currentPosts = ticket.slice(firstPostPostIndex, lastPostIndex);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [modalCheck, setModalCheck] = useState(false);
  const tHead = ['Ticket ID', 'Owner', 'Category', 'Status', 'Barcode', 'Action']

  useEffect(() => {
    const timeout = setTimeout(() => {
      userTicketFiltered(userName, (result) => setTicket(result.data));
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [userName]);

  const handleFilterChange = (event) => {
    setUserName(event.target.value);
  };

  const updateHandler = async (e) => {
    setUpdate({ ...update, id: e });
  };

  useEffect(() => {
    if (update.id !== 0) {
      updateUserTicket(update, () => setChangeData(!changeData));
    }
  }, [update]);

  useEffect(() => {
    getUserTicket((result) => setTicket(result));
  }, [changeData]);

  const tBody = <TableData
    currentPosts={currentPosts}
    updateHandler={updateHandler}
  />

  return (
    <>
      <ModalEdit
        modalCheck={modalCheck}
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
      />
      <div className="p-4 sm:ml-64 h-min pt-[85px]">
        {/* Search Bar */}
        <div className=" flex flex-wrap justify-between py-5">
          {/* Search */}
          <Search
            handleFilterChange={handleFilterChange}
          />
          {/* {barcode} */}
          <button
            onClick={() => {
              setShowModalEdit(true);
              setModalCheck(!modalCheck);
            }}
            type="button"
            className="relative focus:outline-none text-white bg-[#019267] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <CiBarcode size={30} />
            Scan
          </button>
        </div>
        <Table
          tHead={tHead}
          tBody={tBody}
        />
        <Pagination
          totalPosts={ticket.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default ShowUserTicketPage;
