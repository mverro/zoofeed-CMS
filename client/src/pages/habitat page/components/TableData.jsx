import React from 'react'
import { FaEye } from 'react-icons/fa'

const TableData = ({ habitat, detailHandle }) => {
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    return (
        <tbody>
            {
                habitat.map((item) => {
                    return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img
                                    className="w-8 h-8 rounded-full object-cover"
                                    src={`https://zoofeed-api.vercel.app/${item.imageUrl}`}
                                    alt="user"
                                />
                                {item.name}
                            </th>
                            <td className='px-6 py-4'>
                                {item.description}
                            </td>
                            <td className="px-6 py-4">
                                <div className='flex gap-3'>
                                    <div
                                        className='cursor-pointer' onClick={() => detailHandle(item.id)}
                                    >
                                        <FaEye size={23} />
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