import React, { useState, useRef, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { Tooltip } from "@material-tailwind/react";

const NavBar = ({ loginCbHandler, userData, onProfile, setOnProfile }) => {
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState("light")
    const menuRef = useRef();
    const imgRef = useRef();

    const logoutHandler = () => {
        localStorage.clear()
        loginCbHandler(false)
        navigate('/login')
    }

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [])

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme])

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }


    window.addEventListener('click', (e) => {
        if (e.target !== menuRef.current && e.target !== imgRef.current) {
            setOpen(false);
        }
    })

    return (
        <>
            <nav className={`z-20 bg-[#019267] border-gray-200 dark:bg-gray-800 fixed w-full dark:border-b-[1px] dark:border-slate-500`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to='/'>
                        <span className="cursor-pointer self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">Zoo Feed</span>
                    </Link>
                    <div className="flex items-center md:order-2">
                        {/* Dark mode button */}
                        <Tooltip
                            className='z-30 p-3'
                            content="Dark Mode"
                        >
                            <div onClick={handleThemeSwitch} className='bg-white dark:bg-gray-800 rounded-full p-2 cursor-pointer mr-7 dark:hover:bg-gray-700'>
                                {
                                    theme === 'light'
                                        ? <FaMoon color='#3C4048' />
                                        : <FaSun color='#CFD2CF' />
                                }
                            </div>
                        </Tooltip>

                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img
                                ref={imgRef}
                                onClick={() => setOpen(!open)}
                                className="w-10 h-10 rounded-full object-cover"
                                src={`https://zoofeed-api.vercel.app/${userData.imageUrl}`}
                                alt="user"
                            />
                        </button>
                        {/* Dropdown menu */}
                        {
                            open && (
                                <div ref={menuRef} className="z-50 fixed right-3 top-12 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{userData.name}</span>
                                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userData.email}</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <Link to='profile' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                                        </li>
                                        <li onClick={() => logoutHandler()}>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar