import React, { useState, useEffect } from 'react'
import { updateUser, readDataUser } from '../../axios/user';

const UserInfoPage = () => {
    const [id, setId] = useState(null)
    const [uploadImage, setUploadImage] = useState(null);
    const [update, setUpdate] = useState(false);
    const [userInfo, setUserInfo] = useState({

    })
    const [form, setForm] = useState({
        name: '',
        age: 0,
        email: '',
        imageUrl: null,
        roleId: undefined,
    });

    const saveHandler = async () => {
        updateUser(id, form, () => setUpdate(!update));
    }

    function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        setForm({ ...form, imageUrl: uploaded });
        setUploadImage(URL.createObjectURL(uploaded));
    }

    useEffect(() => {
        readDataUser(result => {
            setId(result.id);
            setUserInfo({ result })
            setForm({
                name: result.name,
                age: result.age,
                email: result.email,
                imageUrl: result.imageUrl,
                roleId: result.roleId
            })
        })
    }, [update])

    return (
        <div className="p-4 sm:ml-64 h-screen pt-[85px] dark:bg-gray-900">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="px-6 py-6 lg:px-8">
                    {/* name & image */}
                    <div className='flex flex-wrap justify-start'>
                        <div className="overflow-clip pl-5">
                            <div className="mb-2">
                                <img
                                    src={uploadImage || form.imageUrl}
                                    className="img-thumbnail h-24 w-24 object-cover rounded-full"
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
                        <div className=''>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="animal name" value={form.name} required />
                        </div>
                    </div>
                    {/* Email & Age */}
                    <div className='flex flex-wrap items-center justify-between mt-5'>
                        <div className='w-1/2 pr-5'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input onChange={(e) => setForm({ ...form, email: e.target.value })} value={form.email} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="animal age" required />
                        </div>
                        <div className='w-1/2 pr-5'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                            <input onChange={(e) => setForm({ ...form, age: e.target.value })} value={form.age} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="animal age" required />
                        </div>
                    </div>
                    <button onClick={() => saveHandler()} className="w-1/4 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </div>
            </div>
        </div>
    )
}

export default UserInfoPage