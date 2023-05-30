import React from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { FormatRupiah } from "@arismun/format-rupiah";

const TableData = (props) => {
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    return (
        <tbody>
            {
                props.currentPosts.map((item) => {
                    return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img
                                    className="w-8 h-8 rounded-full object-cover"
                                    src={`${protocol}//${host}:3000/${item.imageUrl}`}
                                    alt="user photo"
                                />
                                {item.name}
                            </td>
                            <td className="px-6 py-4">
                                {item.type}
                            </td>
                            <td className="px-6 py-4">
                                {item.stock}
                            </td>
                            <td className="px-6 py-4">
                                <FormatRupiah value={item.price} />
                            </td>
                            <td className="px-6 py-4">
                                <div className='flex gap-5'>
                                    <div className='cursor-pointer' onClick={() => props.detailHandler(item.id)}>
                                        <FaEye size={23} className='fill-[#3BACB6]' />
                                    </div>
                                    <div onClick={() => props.editHandler(item.id)} className='cursor-pointer'>
                                        <FaEdit size={23} className='fill-gray-500' />
                                    </div>
                                    <div
                                        className='cursor-pointer'
                                        onClick={() => props.deleteHandler(item.id)}>
                                        <FaTrash size={20} className='fill-[#F94C66]' />
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