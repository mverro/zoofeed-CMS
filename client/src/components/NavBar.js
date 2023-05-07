import React, { useState, useRef, useEffect } from 'react'

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState("light")
    const menuRef = useRef();
    const imgRef = useRef();

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
            <nav className="z-20 bg-[#019267] border-gray-200 dark:bg-gray-900 fixed w-full">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" style={{ fontFamily: "Zoo", fontSize: "3rem", color: "white" }}>Zoo Feed</span>
                    <div className="flex items-center md:order-2">
                        <div onClick={handleThemeSwitch} className='bg-slate-600 rounded-full p-2 cursor-pointer mr-3'>
                            <p className='text-white'>DARK</p>
                        </div>
                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img
                                ref={imgRef}
                                onClick={() => setOpen(!open)}
                                className="w-8 h-8 rounded-full object-cover"
                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt="user photo"
                            />
                        </button>
                        {/* Dropdown menu */}
                        {
                            open && (
                                <div ref={menuRef} className="z-50 fixed right-3 top-12 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">Ryan</span>
                                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@mail.com</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                        </li>
                                        <li>
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