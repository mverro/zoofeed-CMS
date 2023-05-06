import React from 'react'

const Modal = ({ showModal, setShowModal }) => {

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
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
                                    <div className='bg-gray-100 h-auto w-1/3 mx-2 shadow-lg rounded-md p-3'>
                                        <img
                                            className="w-24 h-24 rounded-lg object-cover"
                                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                            alt="user photo"
                                        />
                                        <p className='text-lg font-semibold'>Nama Hewan</p>
                                    </div>
                                    <div className='bg-white h-auto w-2/3 p-3 shadow-lg rounded-md'>
                                        <div className='mb-3'>
                                            <p className='font-semibold text-lg'>About</p>
                                            <p className='font-normal text-slate-700 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit debitis aliquam, ad deleniti ut molestias, aliquid tempore saepe dolore, ipsum labore iure quas accusamus quo maiores placeat numquam eos consequuntur!</p>
                                        </div>
                                        <div className='flex flex-wrap mb-3'>
                                            <div className='w-1/2'>
                                                <p className='font-semibold text-lg'>Age</p>
                                                <p className='font-normal text-slate-700 text-base'>10</p>
                                            </div>
                                            <div className='w-1/2'>
                                                <p className='font-semibold text-lg'>Sex</p>
                                                <p className='font-normal text-slate-700 text-base'>Male</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap'>
                                            <div className='w-1/2'>
                                                <p className='font-semibold text-lg'>Class</p>
                                                <p className='font-normal text-slate-700 text-base'>Mamalia</p>
                                            </div>
                                            <div className='w-1/2'>
                                                <p className='font-semibold text-lg'>Habitat</p>
                                                <p className='font-normal text-slate-700 text-base'>River</p>
                                            </div>
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