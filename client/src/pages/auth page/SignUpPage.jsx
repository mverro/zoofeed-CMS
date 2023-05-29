import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUser } from '../../axios/user'
import { useFormik } from "formik";
import * as yup from "yup";
import { Checkbox } from "@material-tailwind/react";

const SignUpPage = ({ loginCbHandler }) => {
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const submitHandler = () => {
        createUser(formik.values, loginCbHandler);
        navigate('/')
    };

    const showPassword = () => {
        setShowPass(!showPass);
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            age: 0,
            email: "",
            password: "",
            roleId: 2,
        },
        onSubmit: submitHandler,
        validationSchema: yup.object().shape({
            name: yup.string().required().min(3).max(10),
            age: yup.number().required(),
            email: yup.string().required().email(),
            password: yup.string()
                .required()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
                ),
        }),
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    };
    return (
        <>
            <section className="relative bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                                <div>
                                    <label className="block text-base font-medium text-gray-900 dark:text-white">Name</label>
                                    <input
                                        name='name'
                                        placeholder='Name'
                                        onChange={handleForm}
                                        className={`bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                    />
                                    <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.name}</span>
                                </div>
                                <div>
                                    <label className="block text-base font-medium text-gray-900 dark:text-white">Age</label>
                                    <input
                                        name='age'
                                        placeholder='age'
                                        onChange={handleForm}
                                        className={`bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                    />
                                    <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.age}</span>
                                </div>
                                <div>
                                    <label className="block text-base font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        name='email'
                                        placeholder='Email'
                                        onChange={handleForm}
                                        className={`bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                    />
                                    <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.email}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className="block text-base font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type={`${showPass ? 'text' : 'password'}`}
                                        name='password'
                                        placeholder='Password'
                                        onChange={handleForm}
                                        className={`bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                    />
                                    <Checkbox
                                        onChange={showPassword}
                                        label="Show"
                                        color='teal'
                                        className='text-sm'
                                    />
                                    <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.password}</span>
                                </div>
                                <button type="submit" className="w-full text-white bg-[#019267] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUpPage