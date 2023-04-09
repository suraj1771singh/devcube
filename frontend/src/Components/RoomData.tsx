import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { TbSend } from 'react-icons/tb'
import Comment from './Comment'
import { CalcTime } from './time'
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import {MdOutlineReport} from 'react-icons/md'
import { joinRoom, leaveRoom } from '../Redux/room/room.action'
import { Dispatch } from 'redux'
import { createComments } from '../Redux/comments/comments.actions'
import Alert from './Alert'
const RoomData = ({data}:any) => {
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  const{myData} =  useSelector((val:rootReducertype)=>val?.auth)
  const allComments = useSelector((val:rootReducertype)=>val.comments.recentComments)
  const dispatch:Dispatch<any> = useDispatch()
  const [toggle,setToggle] = useState(false)
  const [owner,setOwner] = useState(false)
  const [isParticipant, setIsParticipant] = useState(false);
  const [showComments,setShowComments] = useState(true)
  const [commentBody,setCommentBody] = useState("")
  const [alertModal, setAlertModal] = useState(false)
  let topic=[1,2,3,4,2]
  let date = data?.created;
  let createdTime = new Date(date).getTime()
  let updatedTime = new Date(data?.updated).getTime()

  useEffect(()=>{
    setIsParticipant(data?.participants.some((el:any)=>el.id===myData?.user_id))
  },[data?.participants,data?.participants.length, myData?.user_id])

    useEffect(()=>{
      if(data?.host.id===myData?.user_id){
        setOwner(true)
      }else{
        setOwner(false)
      }
    },[data?.host.id, myData?.user_id])
    
    const toggleMoreInfo = (e:any)=>{
    e.stopPropagation()
      setToggle(!toggle)
    }
    const editRoomModal = ()=>{
      console.log('hello')
    }
    const deleteRoomModal = ()=>{
      console.log('delete butn clicked')
    }
    const reportRoomModal = ()=>{
      console.log('report room was clicked')
    }
    const handleLeaveRoom = (id:string|number)=>{
      let user = {id:myData.user_id,email:myData.username}
      dispatch(leaveRoom(id,user))
    }
    const handleJoinRoom = (id:number|string)=>{
      let user = {id:myData.user_id,email:myData.username}
      dispatch(joinRoom(id,user))
   }

   const handleComment = (id:string|number)=>{
    if(isParticipant){
      if(commentBody.length>4){
        let msg = {body:commentBody} 
        dispatch(createComments(msg,id))
        setCommentBody("")
      }else{
        console.log('empty')
      }
    }else{
      setAlertModal(!alertModal)
    }
   }
  return (
    <>
        <div className={`${drk_theme ?"bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl p-6 shadow-md ease-in-out duration-500 animate-in slide-in-from-bottom-48 mb-20`} >
      <div onClick={()=>setToggle(false)} className='relative' >
        <div className='my-2'>
          <div className='flex justify-between items-center' >
            <div className='flex items-center'>
        <h2 className='text-xl font-bold' >{data?.name}</h2> <span className='text-gray-400 mx-2 font-normal' >{(updatedTime!==createdTime)?"(edited)":""}</span>
            </div>
            <div>
            <FiMoreHorizontal className='text-2xl cursor-pointer hover:text-third_color mx-8' onClick={(e)=>toggleMoreInfo(e)} />
           {owner?toggle&&<div className='py-4 absolute w-fit top-[10%] right-[2%] p-2 font-semibold rounded-xl shadow-md'>
              <div onClick={editRoomModal} className='text-third_color mb-2 cursor-pointer flex items-center'>
                <AiFillEdit className='mx-2'/>
               <span className='mx-2'>
                Edit
                </span>  
              </div>
              <div onClick={deleteRoomModal} className='text-red-400 cursor-pointer flex items-center'>
              <AiFillDelete className='mx-2'/>
               <span className='mx-2'>
                Delete
                </span>  
              </div>
            </div>:toggle&&<div className='p-2 absolute w-fit top-[10%] right-[2%] font-semibold rounded-xl shadow-md'>
            <div onClick={reportRoomModal} className='text-red-400 mb-2 cursor-pointer flex items-center'>
              <MdOutlineReport className='mx-2'/>
               <span className='mx-2'>
                Report
                </span>  
            </div>
           { isParticipant?<div onClick={()=>handleLeaveRoom(data.id)} className='text-red-400 cursor-pointer flex items-center'>
              <MdOutlineReport className='mx-2'/>
               <span className='mx-2'>
                Leave Room
                </span>  
            </div>:<div onClick={()=>handleJoinRoom(data.id)} className='text-red-400 cursor-pointer flex items-center'>
              <MdOutlineReport className='mx-2'/>
               <span className='mx-2'>
                Join Room
                </span>  
            </div>}
              </div>
              }

            </div>
          </div>
        <p className='text-sm font-semibold my-2'>Hosted by</p> 
        </div>
        <div className='flex items-center'>
          <img src="/profile.svg" alt="pp" className='w-[40px] mr-2'/>
          <h3 className='mx-2 font-semibold '>{data?.host.first_name} {data?.host.last_name}</h3>
          <p className='text-sm'> {createdTime&&CalcTime(createdTime)}</p>
        </div>
        <div className='m-6'>
          <p>{data?.description}</p>
        </div>
        <h4 className='font-semibold my-2' >Topic Tages</h4>
        <div className='mr-6 my-4'> 
        {topic?.map((el,id)=><button key={id} className={`${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} py-2 mr-6 px-4 my-4 rounded-full`} >TagName</button>)}
        </div>
        <div className={`px-2 py-3 rounded-xl hidden md:flex items-center justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}>
                    <textarea rows={5} onChange={(e)=>setCommentBody(e.target.value)} value={commentBody} className={`w-[80%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} placeholder='Add Comment..'></textarea>
                    <TbSend onClick={()=>handleComment(data?.id)} className={`text-3xl ${(commentBody.length<4)?"text-gray-400":"cursor-pointer"}`} />
                </div>
      </div>
      <div className='mt-12'>
        <button onClick={()=>setShowComments(!showComments)} className='text-xl font-semibold my-2 mx-4'>Comments <span> </span> </button>
       {showComments&&<div className='border-2 mx-4'>
         {allComments?.map((el:any,id:string|number)=><Comment key={id} data={el} />)}
        </div>}
      </div>
    </div>
    {alertModal&&<Alert text="Join Room for sharing your Views" type='error' closeAlert={()=>setAlertModal(false)}  />}
    </>
  )
}

export default RoomData