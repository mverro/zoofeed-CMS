import React, { useState, useEffect } from 'react'
import { detailData } from '../../../axios/food';
import { readDataAnimal } from '../../../axios/animal';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { addFA, deleteFA } from '../../../axios/animalFood';
import { Tooltip } from "@material-tailwind/react";

const ModalDetail = ({ showModalDetail, setShowModalDetail, id, detailCheck }) => {
    const [foods, setFoods] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [modalAddAnimal, setModalAddAnimal] = useState(false);
    const [allAnimal, setAllAnimal] = useState([]);
    const [changeData, setChangeData] = useState(false)
    const [allFood, setAllFood] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [detail, setDetail] = useState({
        data: {},
        consumed: {},
    });
    const [form, setForm] = useState({
        animalId: 0,
    });

    const submithandle = () => {
        addFA(detail.data.id, form, () => setChangeData(!changeData));
        setModalAddAnimal(false);
        setShowModalDetail(true);
    }

    const closeHandle = () => {
        setIsEdit(false);
        setShowModalDetail(false);
        document.body.style.overflow = 'unset';
    }

    const deleteAnimalHandle = (id) => {
        deleteFA(detail.data.id, id, () => setChangeData(!changeData));
    }

    const getFoodDetail = () => {
        detailData(+id, (result) => {
            setDetail({
                data: result.resultAF,
                consumed: result.consumed[0],
            });
            setAnimals(result.resultAF.animals);
        });
        readDataAnimal((result) => setAllAnimal(result));
    };

    useEffect(() => {
        getFoodDetail();
        if (showModalDetail) {
            document.body.style.overflow = 'hidden';
        }
    }, [detailCheck, changeData]);

    return (
        <>
            {
                modalAddAnimal
                    ? (
                        <>
                            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                                <div className='relative w-1/3'>
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h2 className="text-3xl font-semibold dark:text-slate-100">
                                                Choose Animal
                                            </h2>
                                            <button
                                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                                onClick={() => {
                                                    setModalAddAnimal(false);
                                                    setShowModalDetail(true);
                                                }}
                                            >
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div className="m-5">
                                            <select
                                                onChange={(e) =>
                                                    setForm({ ...form, animalId: e.target.value })
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option> Choose Animal</option>
                                                {allAnimal.map((animal) => {
                                                    return (
                                                        <>
                                                            <option value={animal.id}>{animal.name}</option>
                                                        </>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className='mx-5 mb-5'>
                                            <button onClick={() => submithandle()} type="submit" class=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
                        </>
                    )
                    : null
            }
            {showModalDetail ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-2/3 mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold dark:text-slate-100">
                                        Food Information
                                    </h3>
                                    <button
                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                        onClick={() => closeHandle()}
                                    >
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex">
                                    <div className='bg-gray-50 dark:bg-slate-800 h-auto w-[20%] mr-3 shadow-lg rounded-md p-3'>
                                        <img
                                            className="w-24 h-24 rounded-lg object-cover"
                                            src={detail.data.imageUrl}
                                        />
                                        <p className='text-lg font-semibold dark:text-slate-100'>{detail.data.name}</p>
                                    </div>
                                    <div className='w-[80%]'>
                                        <div className='bg-white dark:bg-slate-800 h-auto p-3 shadow-md rounded-md'>
                                            <div className='flex flex-wrap mb-3'>
                                                <div className='w-1/3'>
                                                    <p className=' dark:text-slate-100 font-semibold text-lg'>Type</p>
                                                    <p className='font-normal text-slate-700 text-base dark:text-slate-200'>{detail.data.type}</p>
                                                </div>
                                                <div className='w-1/3'>
                                                    <p className=' dark:text-slate-100 font-semibold text-lg'>Stock</p>
                                                    <p className='font-normal text-slate-700 text-base dark:text-slate-200'>{detail.data.stock}</p>
                                                </div>
                                                <div className='w-1/3'>
                                                    <p className=' dark:text-slate-100 font-semibold text-lg'>Price</p>
                                                    <p className='font-normal text-slate-700 text-base dark:text-slate-200'>{detail.data.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='h-auto mt-3 shadow-md rounded-md p-3 dark:bg-slate-800'>
                                            <div className='flex flex-wrap justify-between items-start'>
                                                <p className='dark:text-slate-100 font-semibold text-lg mb-3 self-center'>Consumer</p>
                                                <div onClick={() => setIsEdit(!isEdit)} className='cursor-pointer hover:bg-slate-100 p-1 rounded-md'>
                                                    <FaEdit color='gray' />
                                                </div>
                                            </div>
                                            <div className='flex flex-wrap gap-3 items-center justify-center'>
                                                {
                                                    animals.length !== 0
                                                        ? animals.map((animal) => {
                                                            return (
                                                                <div className='relative'>
                                                                    <Tooltip
                                                                        className='z-50 p-3'
                                                                        content={animal.name}
                                                                    >
                                                                        <img
                                                                            className="w-14 h-14 rounded-lg object-cover"
                                                                            src={animal.imageUrl}
                                                                            alt="Animal image"
                                                                        />
                                                                    </Tooltip>
                                                                    <div onClick={() => deleteAnimalHandle(animal.id)} className={isEdit ? 'flex items-center justify-center rounded-md absolute -top-1 -right-1 h-5 w-5 cursor-pointer bg-red-400' : 'hidden'}>
                                                                        <MdClose color='white' />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : <p className={isEdit ? 'hidden' : 'dark:text-slate-200'}>No Animal</p>
                                                }
                                                <div onClick={() => {
                                                    setShowModalDetail(false);
                                                    setModalAddAnimal(true);
                                                }} className={isEdit ? 'flex justify-center cursor-pointer h-10 w-10 bg-[#019267] hover:bg-green-600 hover:border-transparent p-3 rounded-md' : 'hidden'}>
                                                    <FaPlus color='white' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end px-5 rounded-b">
                                    <button
                                        className="bg-emerald-500 dark:bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => closeHandle()}
                                    >
                                        Okey
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default ModalDetail