import React from 'react'
import RoomCard from './RoomCard'
import Topics from './Topics'
import {IoAddSharp} from 'react-icons/io5'
const Home = () => {
  return (
    <div className='w-11/12 m-auto flex flex-col md:flex-row justify-between'>
        <div className='w-[18%]'>
            <h3 className='font-bold mb-10'>BROWSE TOPICS</h3>
            <Topics/>
        </div>
        <div className='w-[55%]'>
            <div className='flex items-center justify-between' >
                <div>
            <h3 className='font-bold mx-2'>STUDY ROOM</h3>
            <p className='mx-3'>3,2121 Rooms Available</p>
                </div>
                <button className='bg-gray-500 px-4 py-2 rounded-lg flex items-center'> <IoAddSharp className='text-2xl mr-2'/> Create Room</button>
            </div>
            <RoomCard /> 
        </div>
        <div className='w-[20%]'>
            <h3>RECENT ACTIVITIES</h3>

        </div>
    </div>
  )
}

export default Home