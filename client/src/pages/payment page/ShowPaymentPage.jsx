import React, { useState, useEffect } from "react";
import {
  getPayment,
  updatePayment,
  paymentFiltered,
} from "../../axios/payment";
import Pagination from '../../components/Pagination';
import Search from "../../components/Search";
import TableData from "./components/TableData";
import Table from '../../components/Table';

const ShowPaymentPage = () => {
  const [Payment, setPayment] = useState([]);
  const [changeData, setChangeData] = useState(false);
  const [update, setUpdate] = useState({
    method: "Checked by Admin",
    orderId: 0,
  });
  const [userName, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostPostIndex = lastPostIndex - postPerPage;
  const currentPosts = Payment.slice(firstPostPostIndex, lastPostIndex);
  const tHead = ['Order ID', 'User Name', 'Total', 'Method', 'Status', 'Action']

  useEffect(() => {
    const timeout = setTimeout(() => {
      paymentFiltered(userName, (result) => setPayment(result.data));
    }, 500)

    return () => {
      clearTimeout(timeout)
    }

  }, [userName]);

  const handleFilterChange = (event) => {
    setUserName(event.target.value);
  };

  const updateHendler = async (e) => {
    setUpdate({ ...update, orderId: e });
  };

  useEffect(() => {
    if (update.orderId !== 0) {
      updatePayment(update, () => setChangeData(!changeData));
    }
  }, [update]);

  useEffect(() => {
    getPayment((result) => setPayment(result));
  }, [changeData]);

  const tBody = <TableData
    currentPosts={currentPosts}
    updateHendler={updateHendler}
  />

  return (
    <>
      <div className="p-4 sm:ml-64 h-min pt-[85px]">
        <div className="py-5">
          <Search
            handleFilterChange={handleFilterChange}
          />
        </div>
        <Table
          tHead={tHead}
          tBody={tBody}
        />
        <Pagination
          totalPosts={Payment.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default ShowPaymentPage;
