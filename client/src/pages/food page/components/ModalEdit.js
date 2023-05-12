import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getClassType } from '../../../axios/classType';
import { getHabitat } from '../../../axios/habitat';
import { detailData, updateData } from '../../../axios/food';

const ModalEdit = ({ showModalEdit, setShowModalEdit, editCheck, id, changeData, setChangeData }) => {
    const navigation = useNavigate();
    const [classType, setClassType] = useState([]);
    const [habitat, setHabitat] = useState([]);
    const [info, setInfo] = useState({
        data: {},
        consumed: {}
    });

    const [form, setForm] = useState({
        name: "",
        type: "",
        stock: 0,
        price: 0,
        imageUrl: null,
    });

    const closeHandle = () => {
        setShowModalEdit(false);
        document.body.style.overflow = 'unset';
    }

    useEffect(() => {
        getItemInfo();
        if (showModalEdit) {
            document.body.style.overflow = 'hidden';
        }
    }, [editCheck]);

    const getItemInfo = () => {
        detailData(+id, (result) => {
            setInfo({
                data: result.resultAF,
                consumed: result.classTypeData
            });
            setForm({
                name: result.resultAF.name,
                type: result.resultAF.type,
                stock: result.resultAF.stock,
                price: result.resultAF.price,
                imageUrl: result.resultAF.imageUrl,
            })
        });
    };

    function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        setForm({ ...form, imageUrl: uploaded });
        setInfo((prevState) => {
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    imageUrl: URL.createObjectURL(uploaded),
                },
            };
        });
    }

    const submitHandler = () => {
        updateData(id, form, () => setChangeData(!changeData));
        setShowModalEdit(false);
    };

    return (
        <>
            {
                showModalEdit ?
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed pt-20 pb-5 inset-0 z-50 outline-none focus:outline-none">
                        <div class="relative w-full max-w-xl max-h-full">
                            {/* Modal content */}
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => closeHandle()} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="px-6 py-6 lg:px-8">
                                    <div className="flex mb-6 items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold dark:text-slate-200">
                                            Edit Food
                                        </h3>
                                    </div>
                                    <form class="space-y-6" action="#">
                                        {/* name & image */}
                                        <div className='flex flex-wrap justify-start'>
                                            <div className='w-1/2 pr-5'>
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                <input onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="animal name" value={form.name} required />
                                            </div>
                                            <div className="overflow-clip w-1/2 pl-5">
                                                <div className="mb-2">
                                                    <img
                                                        src={info.data.imageUrl}
                                                        className="img-thumbnail h-24 w-24 object-cover rounded-full m-auto"
                                                        alt="..."
                                                        width="300px"
                                                    />
                                                </div>
                                                <input
                                                    onChange={handleUploadChange}
                                                    className="form-control"
                                                    type="file"
                                                    id="formFile"
                                                />
                                            </div>
                                        </div>
                                        {/* age & sex */}
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <div className='w-1/2 pr-5'>
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                                                <input onChange={(e) => setForm({ ...form, stock: e.target.value })} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="animal age" value={form.stock} required />
                                            </div>
                                            <div className='w-1/2 pr-5'>
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                                <input onChange={(e) => setForm({ ...form, price: e.target.value })} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="animal age" value={form.price} required />
                                            </div>
                                        </div>
                                        <button onClick={() => submitHandler()} type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Animal</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

export default ModalEdit