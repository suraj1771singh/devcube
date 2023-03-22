import React from 'react'

const RoomCard = () => {
  return (
    <div className='my-10 bg-bg_sec rounded-xl p-6' >
        <div className='flex justify-between'>
            <div className='flex items-center'>
            <div className='border-2 relative border-third_color w-10 h-10 rounded-full'>
                <img src="" alt="" />
                <div className={`h-3 w-3 rounded-full bg-green-500 absolute bottom-0 right-0 `}></div>
            </div>
            <p className='mx-2 text-third_color' >@username</p>
            </div>
            <div>2 days ago</div>
        </div>
        <h3 className='font-semibold text-xl mt-2'>Room Name</h3>
        <div className='text-center mt-2 mb-2'>
            <p className='text-font_sec'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo amet magni magnam voluptatem architecto earum quisquam temporibus iste, repellat autem quo ex deserunt dignissimos laboriosam recusandae tenetur fuga maiores. Recusandae.</p>
        </div>
        <hr className='mb-3 border-gray-600 mx-3' />

        <div className='flex justify-between ' >
            <p> 2k Joined</p>
            <div className='flex'>
            <button className='border-2 border-third_color px-3 py-1 rounded-full mx-2' >Javascript</button>
            <button className='border-2 border-third_color px-3 py-1 rounded-full mx-2' >Join</button>
            </div>
        </div>
    </div>
  )
}

export default RoomCard