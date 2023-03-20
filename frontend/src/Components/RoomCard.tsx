import React from 'react'

const RoomCard = () => {
  return (
    <div className='my-10 bg-gray-900 rounded-xl p-6 border-2 border-gray-500' >
        <div className='flex justify-between'>
            <div className='flex items-center'>
            <div className='border-2 w-10 h-10 rounded-full'>
                <img src="" alt="" />
            </div>
            <p className='mx-2' >@username</p>
            </div>
            <div>2 days ago</div>
        </div>
        <h3 className='font-semibold text-xl mt-2'>Room Name</h3>
        <div className='text-center mt-2 mb-2'>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo amet magni magnam voluptatem architecto earum quisquam temporibus iste, repellat autem quo ex deserunt dignissimos laboriosam recusandae tenetur fuga maiores. Recusandae.</p>
        </div>
        <hr className='mb-3 border-gray-600 mx-3' />

        <div className='flex justify-between ' >
            <p> 2k Joined</p>
            <div className='flex'>
            <button className='border-2 border-gray-700 px-3 py-1 rounded-full mx-2' >Javascript</button>
            <button className='border-2 border-gray-500 px-3 py-1 rounded-full mx-2' >Join</button>
            </div>
        </div>
    </div>
  )
}

export default RoomCard