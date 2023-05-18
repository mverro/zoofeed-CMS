import React from 'react'

const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom"
            type="button"
            class="relative focus:outline-none text-white bg-[#019267] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
    )
}

export default Button