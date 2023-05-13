import React, { useState, useEffect } from 'react'
import { detailData } from '../../../axios/animal';
import { readData } from '../../../axios/food';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { deleteAF, addAF } from '../../../axios/animalFood';

const ModalDetail = ({ showModalDetail, setShowModalDetail, id, modalCheck }) => {
    const [foods, setFoods] = useState([]);
    const [allFood, setAllFood] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [modalAddFood, setModalAddFood] = useState(false);
    const [changeData, setChangeData] = useState(false)
    const [detail, setDetail] = useState({
        data: {},
        classTypeData: {},
        habitatData: {},
    });
    const [form, setForm] = useState({
        foodId: 0,
    });

    const closeHandle = () => {
        setShowModalDetail(false);
        setIsEdit(false);
        document.body.style.overflow = 'unset';
    }

    const submithandle = () => {
        addAF(detail.data.id, form, () => setChangeData(!changeData));
        setModalAddFood(false);
        setShowModalDetail(true);
    }

    const deleteFoodHandle = (id) => {
        deleteAF(detail.data.id, id, () => setChangeData(!changeData));
    }

    const getAnimalDetail = () => {
        detailData(+id, (result) => {
            setDetail({
                data: result.resultAF,
                classTypeData: result.classTypeData[0],
                habitatData: result.habitatData[0],
            });
            setFoods(result.resultAF.foods);
        });
        readData((result) => setAllFood(result));
    };

    useEffect(() => {
        if (showModalDetail) {
            getAnimalDetail();
            document.body.style.overflow = 'hidden';
        }
    }, [modalCheck, changeData]);

    return (
        <>
            {
                modalAddFood
                    ? (
                        <>
                            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                                <div className='relative w-1/3'>
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h2 className="text-2xl font-semibold dark:text-slate-100">
                                                Food for {detail.data.name}
                                            </h2>
                                            <button
                                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                                onClick={() => {
                                                    setModalAddFood(false);
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
                                                    setForm({ ...form, foodId: e.target.value })
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option> Choose Food</option>
                                                {allFood.map((food) => {
                                                    return (
                                                        <>
                                                            <option value={food.id}>{food.name}</option>
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
                                        Animal Information
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
                                    {/* image */}
                                    <div className='bg-gray-50 dark:bg-slate-800 h-auto w-[20%] mx-2 shadow-lg rounded-md p-3'>
                                        <img
                                            className="w-24 h-24 rounded-lg object-cover"
                                            src={detail.data.imageUrl}
                                        />
                                        <p className='text-lg font-semibold dark:text-slate-100'>{detail.data.name}</p>
                                    </div>
                                    {/* info */}
                                    <div className='bg-white dark:bg-slate-800 h-auto w-[80%] p-3 shadow-lg rounded-md'>
                                        <div className='mb-3'>
                                            <p className='dark:text-slate-100 font-semibold text-lg'>About</p>
                                            <p className='dark:text-slate-200 font-light text-slate-700 text-[16px]'>{detail.data.description}</p>
                                        </div>
                                        <div className='flex flex-wrap mb-3'>
                                            <div className='w-1/2'>
                                                <p className=' dark:text-slate-100 font-semibold text-lg'>Age</p>
                                                <p className='font-normal text-slate-700 text-base dark:text-slate-200'>{detail.data.age}</p>
                                            </div>
                                            <div className='w-1/2'>
                                                <p className='dark:text-slate-100 font-semibold text-lg'>Sex</p>
                                                <p className='font-normal text-slate-700 dark:text-slate-200 text-base'>{detail.data.sex}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap'>
                                            <div className='w-1/2'>
                                                <p className='dark:text-slate-100 font-semibold text-lg'>Class</p>
                                                <p className='font-normal text-slate-700 dark:text-slate-200 text-base'>{detail.classTypeData.name}</p>
                                            </div>
                                            <div className='w-1/2'>
                                                <p className='dark:text-slate-100 font-semibold text-lg'>Habitat</p>
                                                <p className='font-normal text-slate-700 dark:text-slate-200 text-base'>{detail.habitatData.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* consume */}
                                <div className='px-5 mb-5'>
                                    <div className='h-auto w-full mx-auto shadow-lg rounded-md p-3 dark:bg-slate-800'>
                                        <div className='flex flex-wrap justify-between items-start'>
                                            <p className='dark:text-slate-100 font-semibold text-lg mb-3 self-center'>Consume</p>
                                            <div onClick={() => setIsEdit(!isEdit)} className='cursor-pointer hover:bg-slate-100 p-1 rounded-md'>
                                                <FaEdit color='gray' />
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap gap-2 items-center justify-center'>
                                            {
                                                foods.length !== 0
                                                    ? foods.map((food) => {
                                                        return (
                                                            <div className='relative'>

                                                                <img
                                                                    className="w-14 h-14 rounded-lg object-cover hover:bg-black"
                                                                    src={food.imageUrl}
                                                                    alt="Food image"
                                                                />
                                                                <div onClick={() => deleteFoodHandle(food.id)} className={isEdit ? 'flex items-center justify-center rounded-md absolute -top-1 -right-1 h-5 w-5 cursor-pointer bg-red-400' : 'hidden'}>
                                                                    <MdClose color='white' />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    : <p className={isEdit ? 'hidden' : 'dark:text-slate-200'}>No Foods</p>
                                            }
                                            <div onClick={() => {
                                                setShowModalDetail(false);
                                                setModalAddFood(true);
                                            }} className={isEdit ? 'flex justify-center cursor-pointer h-10 w-10 bg-[#019267] hover:bg-green-600 hover:border-transparent p-3 rounded-md' : 'hidden'}>
                                                <FaPlus color='white' />
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
                    <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default ModalDetail