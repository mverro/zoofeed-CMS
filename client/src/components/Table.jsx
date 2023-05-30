import React from 'react'

const Table = (props) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-slate-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            props.tHead.map((item => {
                                return (
                                    <th scope="col" className="px-6 py-3">
                                        {item}
                                    </th>
                                )
                            }))
                        }
                    </tr>
                </thead>
                {props.tBody}
            </table>
        </div>
    )
}

export default Table