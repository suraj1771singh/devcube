import React, { FormEvent, useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createRoom } from '../Redux/room/room.action';
import { rootReducertype } from '../Redux/Store';
import Alert from './Alert';

interface closeModalFunc {
    closeCreateModal:()=>void
}
const CreateRoomModal = (props:closeModalFunc) => {
  const {closeCreateModal} = props;
  const dispatch:Dispatch<any> = useDispatch()
 let {token} = useSelector((val:rootReducertype)=>val.auth)
 const {allTopics} =  useSelector((val:rootReducertype)=>val.topics)
  const [roomData,setRoomData] = useState({room_name:"",room_topic:"",room_about:""})
  const [alert,setAlert] = useState(false)
  let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
  useEffect(()=>{
    document.body.style.overflow='hidden'
    return ()=>{
      document.body.style.overflow='auto'
    }
  },[])
  const handleChange = (e: { target: { name: any; value: any; }; })=>{
    setRoomData({...roomData,[e.target.name]:e.target.value})
  }
  const handleRoomData = (e:FormEvent)=>{
    e.preventDefault();
    let name = roomData.room_name.trim();
    let topic= roomData.room_topic.trim();
    let description = roomData.room_about.trim();
    if(name&&topic&&description&&token){
      let data = {
        name,
        topic,
        description
      }
        dispatch(createRoom(data))
        closeCreateModal()
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
    <div className='fixed flex justify-center items-center bg-black/50 top-0 bottom-0 left-0 right-0'>
        <div className={`${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} md:w-[50%] overflow-hidden shadow-xl rounded-2xl animate-in zoom-in-50 ease-in-out duration-500`}>
          <div className={`h-14 flex items-center px-4 bg-bg_sec ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`}>
            <BsArrowLeft onClick={()=>closeCreateModal()} className='cursor-pointer text-2xl mx-4 text-third_color font-bold' />
            <h3>CREATE ROOM</h3>
          </div>
        <form onSubmit={handleRoomData} className='flex flex-col md:p-10 p-4'>
          <label className='my-2' htmlFor="room_name">Room Name</label>
          <input required className={`bg-bg_sec outline-none p-2 rounded-md ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`} name='room_name' value={roomData.room_name} onChange={handleChange} type="text" placeholder='Room name'/>
          <label htmlFor="room_topic">Topic</label>
            <select className={`outline-none p-2 rounded-md ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`} name="room_topic" id="room_topic" placeholder='Select topic' onChange={handleChange} >
              <option value="">--- Select topic ---</option>
          {
              allTopics.map((el:any)=><option key={el.id} value={el.id}>{el.name}</option>
            )
          }
          </select>
          <label  htmlFor="room_about">About</label>
          <textarea required name="room_about" value={roomData.room_about} onChange={handleChange} className={`${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}outline-none p-2 rounded-md resize-none`} placeholder='About Your Room'id="room_about" cols={20}  rows={4}></textarea>
          <div className=' mt-4 flex flex-row-reverse items-center'>
          <input type="submit" className='py-2 px-4 rounded-md text-right w-fit mx-4 bg-third_color font-semibold text-bg_pri cursor-pointer'value={"Create Room"}/>
            <button onClick={handleClose} className='bg-bg_sec py-2 px-4 rounded-md' >Cancel</button>
          </div>
        </form>
        </div>
     {alert&&<Alert text='Please Fill all the fields' type="red-500"/>}
    </div>
  )
}

export default CreateRoomModal