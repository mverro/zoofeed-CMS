import React, { useState, useEffect } from 'react'
import { createData } from '../../../axios/animal';
import { getClassType } from '../../../axios/classType';
import { getHabitat } from '../../../axios/habitat';
import { Link, useNavigate } from 'react-router-dom'

const ModalAdd = ({ showModalAdd, setShowModalAdd }) => {
    const navigation = useNavigate();
    const [image, setImage] = useState("https://fakeimg.pl/350x200/");
    const [classType, setClassType] = useState([]);
    const [habitat, setHabitat] = useState([]);
    const [form, setForm] = useState({
        name: "",
        age: 0,
        sex: "",
        description: "",
        imageUrl: null,
        classTypeId: 0,
        habitatId: 0,
    });

    function handleUploadChange(e) {
        let uploaded = e.target.files[0];

        setForm({ ...form, imageUrl: uploaded });
        setImage(URL.createObjectURL(uploaded));
    }

    const submitHandler = () => {
        createData(form);
        navigation('/animals')
    };

    useEffect(() => {
        getClassType((result) => setClassType(result));
    }, []);

    useEffect(() => {
        getHabitat((result) => setHabitat(result));
    }, []);

    return (
        <>
            {
                showModalAdd ?
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed pt-20 pb-5 inset-0 z-50 outline-none focus:outline-none">
                        <div class="relative w-full max-w-md max-h-full">
                            {/* Modal content */}
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => setShowModalAdd(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="px-6 py-6 lg:px-8">
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold dark:text-slate-200">
                                            Add Animal
                                        </h3>
                                    </div>
                                    <form class="space-y-6" action="#">
                                        <div className='mt-5'>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="animal name" required />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                            <input onChange={(e) => setForm({ ...form, age: e.target.value })} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="animal age" required />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sex</label>
                                            <select
                                                onChange={(e) => setForm({ ...form, sex: e.target.value })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="countries"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Class
                                            </label>
                                            <select
                                                onClick={(e) => setForm({ ...form, classTypeId: e.target.value })}
                                                id="countries"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option selected>Choose Animal Class</option>
                                                {classType.map((dataClass) => {
                                                    return (
                                                        <>
                                                            <option value={dataClass.id}>{dataClass.name}</option>
                                                        </>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="countries"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Habitat
                                            </label>
                                            <select
                                                onClick={(e) => setForm({ ...form, habitatId: e.target.value })}
                                                id="countries"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option
                                                    selected
                                                >
                                                    Choose Animal Habitat
                                                </option>
                                                {habitat.map((dataHabitat) => {
                                                    return (
                                                        <>
                                                            <option
                                                                value={dataHabitat.id}
                                                            >
                                                                {dataHabitat.name}
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div class="mb-6">
                                            <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description about animal..." onChange={(e) => setForm({ ...form, description: e.target.value })} ></textarea>
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                            <input onChange={handleUploadChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400" id="file_input" type="file" />
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

export default ModalAdd