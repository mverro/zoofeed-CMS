import React, { useState, useEffect } from 'react'
import { login } from '../../axios/user'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import * as yup from "yup";
import { Checkbox } from "@material-tailwind/react";

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
            <section className="relative bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="md:space-y-6" onSubmit={formik.handleSubmit}>
                                <div>
                                    <label className="block text-base font-medium text-gray-900 dark:text-white">Your Email</label>
                                    <input
                                        name='email'
                                        placeholder='Email'
                                        onChange={handleForm}
                                        onBlur={() => handleFocus('email')}
                                        className={`email-input bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                    />
                                    {
                                        email ?
                                            <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.email}</span>
                                            : null
                                    }
                                </div>
                                <div className='flex flex-col'>
                                    <label className="block text-base font-medium text-gray-900 dark:text-white">Your Password</label>
                                    <input
                                        name='password'
                                        type={`${showPass ? 'text' : 'password'}`}
                                        placeholder='Password'
                                        onChange={handleForm}
                                        onBlur={handleFocus}
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
                                            <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.password}</span>
                                            : null
                                    }
                                </div>
                                <button type='submit' className="w-full text-white bg-[#019267] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create an account</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage