import React from 'react'
import { FaTrash, FaEye } from 'react-icons/fa'

const TableData = ({ user }) => {
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    return (
        <tbody>
            {
                user.map((item) => {
                    return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img
                                    className="w-8 h-8 rounded-full object-cover"
                                    src={`${protocol}//${host}:3000/${item.imageUrl}`}
                                    alt="user"
                                />
                                {item.name}
                            </th>
                            <td className='px-6 py-4'>
                                {item.email}
                            </td>
                            <td className='px-6 py-4'>
                                {
                                    item.roleId === 2
                                        ? 'Zookeeper'
                                        : 'Visitor'
                                }
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default TableData