import React, { useState } from 'react'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                className="bg-gray-50 border border-gray-300 focus-visible: text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer"
            />
            <span className='text-pink-600 invisible peer-invalid:visible'>{errorMessage}</span>
        </>
    )
}

export default FormInput