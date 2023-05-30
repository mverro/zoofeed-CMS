import React, { useState, useEffect } from 'react'
import { login } from '../../axios/user'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import * as yup from "yup";
import { Checkbox, Input } from "@material-tailwind/react";
import Image from '../../assets/zoofeed-bg.png'
import Logo from '../../assets/zoo_feed-01.png'

const LoginPage = ({ loginCbHandler, loginStatus, userCheck, setUserCheck }) => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);

    useEffect(() => {
        if (loginStatus) navigate('/');

    }, [loginStatus])

    const submitHandler = () => {
        login(formik.values, loginCbHandler, false);
        navigate('/')
    }

    const handleFocus = (e) => {
        if (e === 'email') {
            setEmail(true);
        } else {
            setPassword(true)
        }
    };

    const showPassword = () => {
        setShowPass(!showPass);
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: submitHandler,
        validationSchema: yup.object().shape({
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
            <div className="w-full h-full flex justify-end z-50">
                <div className="w-1/3 md:mt-0 sm:max-w-md xl:p-0 z-50">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <img src={Logo} alt="Logo" className='w-1/4 m-auto' />
                        <h1 className="font-inter text-xl font-semibold leading-tight tracking-tight text-blue-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form onSubmit={formik.handleSubmit}>
                            <Input
                                variant="outlined"
                                label="Email"
                                name='email'
                                onChange={handleForm}
                                onBlur={() => handleFocus('email')}
                            />
                            {
                                email ?
                                    <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.email}</span>
                                    : null
                            }
                            <div className='mt-5'>
                                <Input
                                    variant="outlined"
                                    label="Password"
                                    name='password'
                                    onChange={handleForm}
                                    onBlur={handleFocus}
                                    type={`${showPass ? 'text' : 'password'}`}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Checkbox
                                    onChange={showPassword}
                                    label="Show"
                                    color='teal'
                                    className='text-sm m-0'
                                />
                                {
                                    password ?
                                        <span className='text-pink-600 font-light text-sm'>{formik.errors.password}</span>
                                        : null
                                }
                            </div>
                            <button type='submit' className="mt-5 w-full text-white bg-[#019267] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="mt-3 text-sm font-light text-blue-gray-500 dark:text-blue-gray-400">
                                Don’t have an account yet? <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create an account</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage