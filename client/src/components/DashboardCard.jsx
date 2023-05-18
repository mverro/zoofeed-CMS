import React from 'react'

const DashboardCard = (props) => {
    return (
        <div className={`${props.color} w-1/4 h-40 rounded-md shadow-md relative pl-7 flex flex-col justify-center dark:bg-slate-900 dark:border-2`}>
            <div className='absolute top-5 right-5'>
                {props.icon}
            </div>
            <div className='text-7xl font-bold text-white'>
                {props.count}
            </div>
            <div className='text-lg font-normal text-white'>
                {props.label}
            </div>
        </div>
    )
}

export default DashboardCard