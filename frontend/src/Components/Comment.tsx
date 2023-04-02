import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'

const Comment = () => {
  return (
    <div>
         <div className='flex items-center'>
          <img src="/profile.svg" alt="pp" className='w-[40px] mr-2'/>
          <h3 className='mx-2 font-semibold '>Host Name</h3>
          <p className='text-sm'>2 day ago</p>
        </div>
        <div className='m-3 px-[40px]'>
            <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla voluptas doloribus reiciendis molestiae in id, blanditiis doloremque quae voluptate? Error repellat laborum ducimus! Eos quae commodi iure tempore repudiandae reprehenderit.
            </p>
            <div className='flex items-center'>
            <button className='my-2 font-bold'>Reply</button>
            <AiOutlineLike className='mx-2 text-xl cursor-pointer'/>
            </div>
        </div>

    </div>
  )
}

export default Comment