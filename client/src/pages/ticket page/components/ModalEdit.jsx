import React, { useState, useEffect } from "react";
import { getTicketId, updateStock } from "../../../axios/ticket";

const ModalEdit = ({
  showModalEdit,
  setShowModalEdit,
  modalCheck,
  id,
  changeData,
  setChangeData,
}) => {
  const [info, setInfo] = useState({
    category: "",
    price: 0,
  });

  const [form, setForm] = useState({
    id: 0,
    stock: 0,
    price: 0,
  });

  const closeHandle = () => {
    setShowModalEdit(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    if (showModalEdit) {
      getItemInfo();
      document.body.style.overflow = "hidden";
    }
  }, [modalCheck]);

  const getItemInfo = () => {
    getTicketId(+id, (data) => {
      const resultData = data.result;
      setInfo({
        category: resultData.ticketType.category,
        price: resultData.ticketType.price
      });
      setForm({
        id: resultData.id,
        stock: resultData.stock,
        price: resultData.ticketType.price
      });
    });
  };

  const submitHandler = () => {
    console.log(form)
    updateStock(form, () => setChangeData(!changeData));
    setShowModalEdit(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {showModalEdit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed pt-20 pb-5 inset-0 z-50 outline-none focus:outline-none">
            <div class="relative w-full max-w-xl max-h-full">
              {/* Modal content */}
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={() => closeHandle()}
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                  <div className="flex mb-6 items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold dark:text-slate-200">
                      Edit Ticket {info.category}

                    </h3>
                  </div>
                  <form class="space-y-6" action="#">
                    {/* Stock $ Price */}
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="w-1/2 pr-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Stock
                        </label>
                        <input
                          onChange={(e) =>
                            setForm({ ...form, stock: e.target.value })
                          }
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="ticket stock"
                          value={form.stock}
                          required
                        />
                      </div>

                      <div className="w-1/2 pr-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Price
                        </label>
                        <input
                          onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                          }
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="ticket price"
                          value={form.price}
                          required
                        />
                      </div>
                    </div>
                    {/* button */}
                    <button
                      onClick={() => submitHandler()}
                      type="submit"
                      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update Data
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalEdit;
