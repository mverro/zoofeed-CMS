import React from 'react'

const TableHead = ({ tableHead }) => {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {
                    tableHead.map((item, i) => {
                        return (
                            <th scope="col" className="px-6 py-3">
                                {item}
                            </th>
                        )
                    })
                }
            </tr>
        </thead>
    )
}

export default TableHead