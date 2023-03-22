import React, { useState } from 'react'
import RoomCard from './RoomCard'
import Topics from './Topics'
import {IoAddSharp} from 'react-icons/io5'
import CreateRoomModal from './CreateRoomModal'
const Home = () => {
    const [createRoom,setCreateRoom]=useState(false)
    const openCreateModal = ()=>{
        setCreateRoom(true)
    }
    const closeCreateModal=()=>{
        setCreateRoom(false)
    }
  return (
    <>
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
                <button onClick={openCreateModal} className='bg-third_color text-bg_pri font-semibold px-4 py-3 rounded-md flex items-center cursor-pointer'> <IoAddSharp className='text-2xl mr-2'/> Create Room</button>
            </div>
            <RoomCard /> 
        </div>
        <div className='w-[20%]'>
            <h3>RECENT ACTIVITIES</h3>
        </div>
    </div>
    {createRoom&&<CreateRoomModal closeCreateModal={closeCreateModal} />}
    </>
  )
}

export default Home