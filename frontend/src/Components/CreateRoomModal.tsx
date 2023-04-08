import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createRoom } from '../Redux/room/room.action';
import { rootReducertype } from '../Redux/Store';
import { AiOutlineClose } from 'react-icons/ai';
import Alert from './Alert';

const CreateRoomModal = ({tags,removeTag}:any) => {
  const dispatch:Dispatch<any> = useDispatch()
  const [limit,setLimit] = useState(false)
  const [exist,setExists] = useState(false)
  const [addTags,setAddTags]= useState([""])
  useEffect(()=>{
    if(tags.length>=6){
      setLimit(true)
    }else{
      setAddTags(tags)
    }
  },[tags])
//  const {allTopics} =  useSelector((val:rootReducertype)=>val.topics)
  const [roomData,setRoomData] = useState({name:"",description:""})

  let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
  const handleChange = (e: { target: { name: any; value: any; }; })=>{
    setRoomData({...roomData,[e.target.name]:e.target.value})
  }
  const handleRoomData = (e:FormEvent)=>{
    e.preventDefault();
    if(addTags.length===0){
      
    }else{
      let room = {...roomData,tags:addTags}

      console.log(room)
    }
        // dispatch(createRoom(roomData))
  }
  const handleClose = ()=>{
    setRoomData({name:"",description:""})
  }
  const closeAlert = ()=>{
    setLimit(false)
  }
  
  return (
    <>
    <div className={`md:w-[80%] ml-[19.3%] p-10 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl`}>
        <form onSubmit={handleRoomData} className='flex flex-col'>
          <input required className={`bg-bg_sec p-2 text-lg rounded-md ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"} py-4 border-2 border-gray-500 mb-2`} name='name' id="name" value={roomData.name} onChange={handleChange} type="text" placeholder='Room Title'/>
          
          <textarea required name="description" value={roomData.description} onChange={handleChange} className={`${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"} outline-none p-4 rounded-md resize-none my-4 border-gray-500 border-2 `} placeholder='About Your Room'id="room_about" cols={20}  rows={16}></textarea>

          <div className='border-2 border-gray-500 p-3 my-2 rounded-xl flex items-center '>
            <div className='text-gray-500 flex items-center mr-3'>
            <p className='py-2 mx-2'> Tags </p>
            <p> {addTags.length}/5 </p>
            </div>
            <div className='flex'>
           { addTags.map((el:string,id:number)=><p key={id} className='border-2 px-4 py-2 mx-2 flex items-center rounded-full'>{el} <span><AiOutlineClose onClick={()=>removeTag(el)} className='ml-2 cursor-pointer'/> </span> </p> )}
            </div>
          </div>

          <div className='my-4 flex flex-row-reverse items-center'>
          <input type="submit" className='py-2 px-4 rounded-md text-right w-fit text-white mx-4 bg-third_color font-semibold text-bg_pri cursor-pointer'value={"Create Room"}/>
            <button onClick={handleClose} className='bg-red-400 text-white py-2 px-4 rounded-md '>Cancel</button>
          </div>

        </form>
        </div>
        {limit&&<Alert text='Tags cannot Exceed 5 elements' type="error" closeAlert={closeAlert} />}
</>
  )
}

export default CreateRoomModal