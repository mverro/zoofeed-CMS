import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { FaPlusCircle } from 'react-icons/fa'
import { userLike, userUnlike } from '../axios/animalUser'

const Card = (props) => {
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    const { likeData } = props

    const likeAnimal = (id) => {
        userLike(id)
    }
    const unlikeAnimal = id => {
        userUnlike(id);
    }
    return (
        <>
            {
                likeData.map(item => {
                    return (
                        <div key={item.id} className="h-min rounded-md shadow-lg overflow-hidden bg-white w-[300px] hover:bg-slate-100 relative dark:bg-gray-700">
                            <img src={`https://zoofeed-api.vercel.app/${item.imageUrl}`} alt="Image" className='h-56 w-full object-cover object-top' />
                            <div className='px-6 pb-4'>
                                <div className='border-b-2 text-center font-noto font-bold text-xl py-3 text-slate-700 dark:text-slate-100'>{item.name}</div>
                                <div className='flex flex-wrap justify-center'>
                                    <div className='w-1/2'>
                                        <div className='text-center font-semibold dark:text-slate-100'>Age</div>
                                        <div className='text-center dark:text-slate-200'>{item.age}</div>
                                    </div>
                                    <div className='w-1/2'>
                                        <div className='text-center font-semibold dark:text-slate-100'>Sex</div>
                                        <div className='text-center dark:text-slate-200'>{item.sex}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Card