import React from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'

const TableData = ({ user }) => {
    return (
        <tbody>
            {
                user.map((item) => {
                    return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img
                                    className="w-8 h-8 rounded-full object-cover"
                                    src={item.imageUrl}
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
                            <td className="px-6 py-4">
                                <div className='flex gap-3'>
                                    <div
                                        className='cursor-pointer'
                                    >
                                        <FaEye size={23} />
                                    </div>
                                    <div
                                        className='cursor-pointer'
                                    >
                                        <FaTrash size={20} color={'#F15A59'} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default TableData