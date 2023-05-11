import React, { useState, useEffect } from 'react'
import { detailData } from '../../../axios/animal';
import { readData } from '../../../axios/food';
import { FaPlus } from 'react-icons/fa';

const ModalDetail = ({ showModalDetail, setShowModalDetail, id, modalCheck }) => {
    const [foods, setFoods] = useState([]);
    const [allFood, setAllFood] = useState([]);
    const [detail, setDetail] = useState({
        data: {},
        classTypeData: {},
        habitatData: {},
    });

    const closeHandle = () => {
        setShowModalDetail(false);
        document.body.style.overflow = 'unset';
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
    }, [modalCheck]);

    return (
        <>
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
                                    <div className='bg-gray-50 dark:bg-slate-800 h-auto w-[15%] mx-2 shadow-lg rounded-md p-3'>
                                        <img
                                            className="w-24 h-24 rounded-lg object-cover"
                                            src={detail.data.imageUrl}
                                        />
                                        <p className='text-lg font-semibold dark:text-slate-100'>{detail.data.name}</p>
                                    </div>
                                    <div className='bg-white dark:bg-slate-800 h-auto w-[70%] p-3 shadow-lg rounded-md'>
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
                                    <div className='h-auto w-[15%] mx-2 shadow-lg rounded-md p-3 dark:bg-slate-800'>
                                        <div className='flex flex-wrap justify-between items-start'>
                                            <p className='dark:text-slate-100 font-semibold text-lg mb-3 self-center'>Consume</p>
                                            <div className='cursor-pointer hover:border-green-500 border-[2px] p-1 border-green-600 rounded-md'>
                                                <FaPlus color='green' />
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap gap-2 justify-center'>
                                            {
                                                foods.length !== 0
                                                    ? foods.map((food) => {
                                                        return (
                                                            <img
                                                                className="w-14 h-14 rounded-lg object-cover"
                                                                src={food.imageUrl}
                                                                alt="user photo"
                                                            />
                                                        )
                                                    })
                                                    : <p className='dark:text-slate-200'>No Foods</p>
                                            }
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