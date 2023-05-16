import React, { useState, useEffect } from "react";
import { getTicket } from "../../axios/ticket";
import { FaEdit } from "react-icons/fa";
import ModalEdit from './components/ModalEdit';

const ShowPaymentPage = () => {
  const [ticket, setTicket] = useState([]);
  const [id, setId] = useState(0);
  const [changeData, setChangeData] = useState(false);
  const [modalCheck, setModalCheck] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);


  useEffect(() => {
    getTicket((result) => setTicket(result));
  }, [changeData]);

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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Ticket Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ticket.map((item) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        {item.ticketType.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">{item.stock}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">{item.ticketType.price}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="cursor-pointer" onClick={() => {
                        setShowModalEdit(true);
                        setModalCheck(!modalCheck);
                        setId(item.id);
                      }}>
                        <FaEdit size={23} color={"#19A7CE"} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShowPaymentPage;
