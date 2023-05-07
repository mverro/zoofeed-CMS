import React, { useState, useEffect } from 'react'
import { detailData } from '../../../axios/animal';
import { readData } from '../../../axios/food';

const Modal = ({ showModal, setShowModal, id, detailCheck }) => {
    const [foods, setFoods] = useState([]);
    const [allFood, setAllFood] = useState([]);
    const [detail, setDetail] = useState({
        data: {},
        classTypeData: {},
        habitatData: {},
    });

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
        getAnimalDetail();
    }, [detailCheck]);

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-2/3 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Animal Information
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex">
                                    <div className='bg-gray-50 h-auto w-1/4 mx-2 shadow-lg rounded-md p-3'>
                                        <img
                                            className="w-24 h-24 rounded-lg object-cover"
                                            src={detail.data.imageUrl}
                                        />
                                        <p className='text-lg font-semibold'>{detail.data.name}</p>
                                    </div>
                                    <div className='bg-white h-auto w-2/4 p-3 shadow-lg rounded-md'>
                                        <div className='mb-3'>
                                            <p className='font-semibold text-lg'>About</p>
                                            <p className='font-normal text-slate-700 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit debitis aliquam, ad deleniti ut molestias, aliquid tempore saepe dolore, ipsum labore iure quas accusamus quo maiores placeat numquam eos consequuntur!</p>
                                        </div>
                                        <div className='flex flex-wrap mb-3'>
                                            <div className='w-1/2'>
                                                <p className='font-semibold text-lg'>Age</p>
                                                <p className='font-normal text-slate-700 text-base'>{detail.data.age}</p>
                                            </div>
                                            <div className='w-1/2'>
                                                <p className='font-semibold text-lg'>Sex</p>
                                                <p className='font-normal text-slate-700 text-base'>{detail.data.sex}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap'>
                                            <div className='w-1/2'>
                                                <p className='font-semibold text-lg'>Class</p>
                                                <p className='font-normal text-slate-700 text-base'>{detail.classTypeData.name}</p>
                                            </div>
                                            <div className='w-1/2'>
                                                <p className='font-semibold text-lg'>Habitat</p>
                                                <p className='font-normal text-slate-700 text-base'>{detail.habitatData.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-white h-auto w-1/4 mx-2 shadow-lg rounded-md p-3'>
                                        <p className='font-semibold text-lg mb-3'>Consume</p>
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
                                                    : <p>No Foods</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
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

export default Modal