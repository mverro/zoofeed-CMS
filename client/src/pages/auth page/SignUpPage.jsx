import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUser } from '../../axios/user'
import { useFormik } from "formik";
import * as yup from "yup";
import { Checkbox } from "@material-tailwind/react";
import Image from '../../assets/zoofeed-bg.png'
import Logo from '../../assets/zoo_feed-01.png'

const SignUpPage = ({ loginCbHandler }) => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [name, setName] = useState(false);
    const [age, setAge] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);

    const handlefocus = (cek) => {
        switch (cek) {
            case 'name':
                setName(true)
                break;
            case 'age':
                setAge(true)
                break;
            case 'email':
                setEmail(true)
                break;
            case 'password':
                setPassword(true)
                break;
            default:
                break;
        }
    }

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
            {/* bg image */}
            <div className='w-4/5  h-full fixed -z-50'>
                <div className='bg-black w-full h-full opacity-10 absolute'></div>
                <img
                    src={Image}
                    alt="Background"
                    className='h-full object-left-bottom object-cover'
                />
            </div>
            {/* bg white left */}
            <div className="fixed w-1/3 h-full right-0 bg-white -z-40">
            </div>
            {/* content */}
            <div className='w-full h-full flex justify-end z-50'>
                <div className="dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 z-50">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <img src={Logo} alt="Logo" className='w-1/4 m-auto' />
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
                                    onBlur={() => handlefocus('name')}
                                    className={`bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                />
                                {
                                    name ?
                                        <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.name}</span> : null
                                }
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-900 dark:text-white">Age</label>
                                <input
                                    name='age'
                                    placeholder='age'
                                    onChange={handleForm}
                                    onBlur={() => handlefocus('age')}
                                    className={`bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                />
                                {
                                    age ?
                                        <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.age}</span> : null
                                }
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    name='email'
                                    placeholder='Email'
                                    onChange={handleForm}
                                    onBlur={() => handlefocus('email')}
                                    className={`bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                />
                                {
                                    email ?
                                        <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.email}</span> : null
                                }
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-base font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type={`${showPass ? 'text' : 'password'}`}
                                    name='password'
                                    placeholder='Password'
                                    onChange={handleForm}
                                    onBlur={() => handlefocus('password')}
                                    className={`bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                />
                                <Checkbox
                                    onChange={showPassword}
                                    label="Show"
                                    color='teal'
                                    className='text-sm'
                                />
                                {
                                    password ?
                                        <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.password}</span> : null
                                }
                            </div>
                            <button type="submit" className="w-full text-white bg-[#019267] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage