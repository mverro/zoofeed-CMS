import React from 'react'
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { FormatRupiah } from "@arismun/format-rupiah";

const TableData = (props) => {
    return (
        <tbody>
            {props.currentPosts.map((item) => {
                return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td
                            scope="row"
                            className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {item.id}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">{item.user.name}</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">
                                <FormatRupiah value={item.total} />
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">{item.method}</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">
                                {item.status === true ? (
                                    <GrCheckboxSelected size={23} class="bg-green-400" />
                                ) : (
                                    <GrCheckbox size={23} />
                                )}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">
                                {item.status === true ? (
                                    <button
                                        value={item.orderId}
                                        type="button"
                                        class="focus:outline-none text-white bg-[#019267] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:focus:ring-green-800"
                                    >
                                        Done
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => props.updateHendler(item.orderId)}
                                        type="button"
                                        class="focus:outline-none text-white bg-[#FFA500] hover:bg-[#FF8C00] focus:ring-4 focus:ring-[#FFA500] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#FFA500] dark:hover:bg-[#FF8C00] dark:focus:ring-[#FFA500]"
                                    >
                                        Check
                                    </button>
                                )}
                            </div>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    )
}

export default TableData