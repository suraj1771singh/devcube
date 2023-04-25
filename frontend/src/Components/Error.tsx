import React from 'react'
import { BiError } from 'react-icons/bi'
import { IoRefreshOutline } from 'react-icons/io5'

const Error = ({text="Something went wrong"}:{text?:string}) => {
  return (
    <div className='flex flex-col justify-center items-center rounded-full'>
    <BiError className='text-4xl text-red-600' />
    <h5 className='my-4 text-red-400'>{text}</h5>
    <button onClick={()=>window.location.reload()} className='hover:text-blue-500 hover:underline flex items-center'>Reload <IoRefreshOutline className='mx-2 text-xl' /></button>
    </div>
  )
}

export default Error