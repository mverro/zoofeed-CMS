import React, { useEffect, useState } from 'react'
import { detailHabitat } from '../../../axios/habitat';
import { Tooltip } from "@material-tailwind/react";

const ModalDetail = (props) => {
    const [habitats, setHabitats] = useState({});
    const host = window.location.hostname;
    const protocol = window.location.protocol;

    const closeHandle = () => {
        props.setShowModalDetail(false);
        document.body.style.overflow = 'unset';
    }

    useEffect(() => {
        if (props.showModalDetail) {
            detailHabitat(props.id, (result) => setHabitats(result))
            console.log(habitats);
            document.body.style.overflow = 'hidden';
        }
    }, [props.modalCheck])

    return (
        <>
            {props.showModalDetail ? (
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
                                        Habitat Information
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
                                            src={`https://zoofeed-api.vercel.app/${habitats.imageUrl}`}
                                        />
                                        <p className='text-lg font-semibold dark:text-slate-100'>{habitats.name}</p>
                                    </div>
                                    {/* info */}
                                    <div className='bg-white dark:bg-slate-800 h-auto w-[80%] p-3 shadow-lg rounded-md'>
                                        <div className='mb-3'>
                                            <p className='dark:text-slate-100 font-semibold text-lg'>About</p>
                                            <p className='dark:text-slate-200 font-light text-slate-700 text-[16px]'>{habitats.description}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* consume */}
                                <div className='px-5 mb-5'>
                                    <div className='h-auto w-full mx-auto shadow-lg rounded-md p-3 dark:bg-slate-800'>
                                        <div className='flex flex-wrap justify-between items-start'>
                                            <p className='dark:text-slate-100 font-semibold text-lg mb-3 self-center'>Animals</p>

                                        </div>
                                        <div className='flex flex-wrap gap-2 items-center justify-center'>
                                            {
                                                // habitats.animals.map((animal) => {
                                                //     return (
                                                //         <div className='relative'>
                                                //             <Tooltip
                                                //                 className='z-50 p-3'
                                                //                 content={animal.name}
                                                //             >
                                                //                 <img
                                                //                     className="w-14 h-14 rounded-lg object-cover hover:bg-black"
                                                //                     src={`https://zoofeed-api.vercel.app/${animal.imageUrl}`}
                                                //                     alt="Food"
                                                //                 />
                                                //             </Tooltip>
                                                //         </div>
                                                //     )
                                                // })
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
                    <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default ModalDetail