import React from 'react'
import { FormatRupiah } from "@arismun/format-rupiah";
import { FaEdit } from "react-icons/fa";

const TableData = (props) => {
    return (
        <tbody>
            {props.ticket.map((item) => {
                return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td
                            scope="row"
                            className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {item.id}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">
                                {item.ticketType.category}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">{item.stock}</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">
                                <FormatRupiah value={item.ticketType.price} />
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="cursor-pointer" onClick={() => props.editHandler(item.id)}>
                                <FaEdit size={23} color={"#19A7CE"} />
                            </div>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    )
}

export default TableData