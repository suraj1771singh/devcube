import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import Alert from './Alert';

interface closeModalFunc {
    closeCreateModal:()=>void
}
const CreateRoomModal = (props:closeModalFunc) => {
  const {closeCreateModal} = props;
  const dispatch:Dispatch<any> = useDispatch()
  const [roomData,setRoomData] = useState({room_name:"",room_topic:"",room_about:""})
  const [alert,setAlert] = useState(false)
  const handleChange = (e: { target: { name: any; value: any; }; })=>{
    setRoomData({...roomData,[e.target.name]:e.target.value})
  }
  const handleRoomData = (e:FormEvent)=>{
    e.preventDefault();
    let name = roomData.room_name.trim();
    let topic= roomData.room_topic.trim();
    let description = roomData.room_about.trim();
    let author='curr_user';
    let created_at = Date.now();
    let joinee=null
    if(name&&topic&&description){
      let data = {
        name,
        topic,
        description,
        author,
        created_at,
        joinee
      }
      console.log(data)
      // dispatch(createStudyRoom())

    }else{
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 3000);
    }
  }
  const handleClose = ()=>{
    roomData.room_name="";
    roomData.room_topic="";
    roomData.room_about="";
    closeCreateModal()
  }

  return (
    <div onClick={handleClose} className='fixed flex justify-center items-center bg-black/50 top-0 bottom-0 left-0 right-0'>
        <div onClick={(e)=>e.stopPropagation()} className='bg-bg_pri w-[50%] rounded-md overflow-hidden'>
          <div className='h-14 flex items-center px-10 bg-bg_sec'>
            <h3>CREATE STUDY ROOM</h3>
          </div>
        <form onSubmit={handleRoomData} className='flex flex-col p-10'>
          <label className='my-2' htmlFor="room_name">Room Name</label>
          <input required className='bg-transparent outline-none border-2 border-bg_sec p-2 rounded-md' name='room_name' value={roomData.room_name} onChange={handleChange} type="text" placeholder='Room name'/>
          <label htmlFor="room_topic">Topic</label>
          <input className='bg-transparent outline-none border-2 border-bg_sec p-2 rounded-md' required type="text" placeholder='Room Topic' name='room_topic' value={roomData.room_topic} onChange={handleChange} />
          <label  htmlFor="room_about">About</label>
          <textarea required name="room_about" value={roomData.room_about} onChange={handleChange} className='bg-transparent outline-none border-2 border-bg_sec p-2 rounded-md resize-none' placeholder='About Your Room'id="room_about" cols={20}  rows={4}></textarea>
          <div className=' mt-4 flex flex-row-reverse items-center'>
          <input type="submit" className='py-2 px-4 rounded-md text-right w-fit mx-4 bg-third_color font-semibold text-bg_pri cursor-pointer'value={"Create Room"}/>
            <button onClick={handleClose} className='bg-bg_sec py-2 px-4 rounded-md' >Cancel</button>
          </div>
        </form>
        </div>
     {alert&&<Alert text='Please Fill all the fields' type="red"/>}
    </div>
  )
}

export default CreateRoomModal