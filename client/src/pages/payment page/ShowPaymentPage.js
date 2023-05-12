import React, { useState, useEffect } from "react";
import { getPayment,updatePayment } from "../../axios/payment";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import Swal from "sweetalert2";

const ShowPaymentPage = () => {
  const [Payment, setPayment] = useState([]);
  const [update, setUpdate] = useState({
    method: "Check By Admin",
    orderId: 0,
  });

  const updateHendler = async (e) => {
    setUpdate({...update,orderId : e })
    console.log({update})
    updatePayment(update)
  };


  useEffect(() => {
    getPayment((result) => setPayment(result));
  }, []);

  return (
    <>
      <div className="h-[64px]"></div>
      <div className="p-4 sm:ml-64 h-screen dark:bg-gray-900">
        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Payment.map((item) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">{item.user.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">{item.total}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">{item.method}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        {item.status === true ? (
                          <GrCheckboxSelected size={23} class="bg-green-400" />
                        ) : (
                          <GrCheckbox size={23} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        {item.status === true ? (
                          <button
                            value={item.orderId}
                            type="button"
                            class="focus:outline-none text-white bg-[#019267] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:focus:ring-green-800"
                          >
                            Done
                          </button>
                        ) : (
                          <button
                            onClick={() => updateHendler(item.orderId)}
                            type="button"
                            class="focus:outline-none text-white bg-[#FFA500] hover:bg-[#FF8C00] focus:ring-4 focus:ring-[#FFA500] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#FFA500] dark:hover:bg-[#FF8C00] dark:focus:ring-[#FFA500]"
                          >
                            Check
                          </button>
                        )}
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
