import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { TbSend } from 'react-icons/tb'
import { CalcTime } from './time'
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiFillDelete, AiFillEdit, AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import {MdOutlineReport} from 'react-icons/md'
import { deleteRoom, joinRoom, leaveRoom } from '../Redux/room/room.action'
import { Dispatch } from 'redux'
import { createComments } from '../Redux/comments/comments.actions'
import Alert from './Alert'
import { useNavigate } from 'react-router-dom'
import { updateTopicTag } from '../Redux/topic/topic.actions'
import { loggedinUserType, topicDataType } from '../dataTypes'
import Comments from './Comments'
import Loader from './Loader'
import Error from './Error'
const RoomData = ({data}:any) => {
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  const{myData,myId} =  useSelector((val:rootReducertype)=>val?.auth)
  const {join_error, join_loading,leave_loading} = useSelector((val:rootReducertype)=>val?.rooms)
  const dispatch:Dispatch<any> = useDispatch()
  const [toggle,setToggle] = useState(false)
  const [owner,setOwner] = useState(false)
  const [isParticipant, setIsParticipant] = useState(false);
  const [showComments,setShowComments] = useState(true)
  const [alertModal, setAlertModal] = useState(false)
  let date = data?.created;
  let createdTime = new Date(date).getTime()
  let updatedTime = new Date(data?.updated).getTime()
  const nav = useNavigate()
  const [commentBody,setCommentBody] = useState("")
  useEffect(()=>{
    setIsParticipant(data?.participants.some((el:any)=>el.id===myId))
  },[data?.host.id, data?.participants, data?.participants.length, myId])

  useEffect(()=>{
      if(data?.host.id===myId){
        setOwner(true)
      }else{
        setOwner(false)
      }
    },[data?.host.id, myId])
    
    const toggleMoreInfo = (e:any)=>{
    e.stopPropagation()
      setToggle(!toggle)
    }

    const editRoomModal = (data:any)=>{
      dispatch(updateTopicTag(data.topic))
      nav(`/update_room/${data.id}`)
    }

    const deleteRoomModal = (id:number|string)=>{
      //dispatch deleteroom
      dispatch(deleteRoom(id))
      nav("/")
    }

    const reportRoomModal = ()=>{
      console.log('report room was clicked')
    }

    const handleLeaveRoom = (myData:loggedinUserType,id:string|number)=>{
      if(myId){
        let user = {id:myId,email:myData?.email}
        dispatch(leaveRoom(id,user))
      }
    }
    
    const handleJoinRoom = (myData:loggedinUserType,id:number|string)=>{
      if(myId){
        let user = {id:myId,email:myData.email}
        dispatch(joinRoom(id,user))
      }
   }

   const handleComment = (id:string|number)=>{
         if(commentBody.length>4){
        let msg = {body:commentBody,parent:null}  
        dispatch(createComments(msg,id))
        setCommentBody("")
      }
   }
   const handleauthOnchange = (myData:loggedinUserType,e:any)=>{
    if(isParticipant||(myData?.id===data.host.id) ){
      setCommentBody(e.target.value)
      e.target.style.height="auto"
      e.target.style.height= `${e.target.scrollHeight}px`
    }else{
      setAlertModal(!alertModal)
    }
   }
  return (
    <>
        <div className={`${drk_theme ?"bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl p-6 shadow-md ease-in-out mb-20`}>
      <div onClick={()=>setToggle(false)} className='relative' >
        <div className='my-2'>
          <div className='flex justify-between items-center' >
            <div className='flex items-center'>
        <h2 className='text-2xl font-bold' >{data?.name}</h2> <span className='text-fade_font mx-2 font-normal text-sm' >{(updatedTime!==createdTime)?"(edited)":""}</span>
            </div>
            <div>
            <FiMoreHorizontal className='text-2xl cursor-pointer hover:text-third_color mx-8' onClick={(e)=>toggleMoreInfo(e)} />
           {owner?toggle&&<div className='py-4 absolute w-fit top-[10%] right-[2%] p-2 font-semibold rounded-xl shadow-md'> 
              <div onClick={()=>editRoomModal(data)} className='text-third_color mb-2 cursor-pointer flex items-center'>
                <AiFillEdit className='mx-2'/>
               <span className='mx-2'>
                Edit
                </span>  
              </div>
              <div onClick={()=>deleteRoomModal(data?.id)} className='text-red-400 cursor-pointer flex items-center'>
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
           { isParticipant?<div onClick={()=>handleLeaveRoom(myData,data.id)} className='text-red-400 cursor-pointer flex items-center'>
              <MdOutlineReport className='mx-2'/>
               <span className='mx-2'>
                Leave Room
                </span>  
            </div>:<div onClick={()=>handleJoinRoom(myData,data.id)} className='text-red-400 cursor-pointer flex items-center'>
              <MdOutlineReport className='mx-2'/>
               <span className='mx-2'>
                Join Room 
                </span>  
            </div>}
              </div>
              }
            </div> 
          </div>
        <p className='text-sm font-semibold text-fade_font my-2'>Hosted by</p> 
        </div>
        <div className='flex items-center'>
          <img src={data?.host.photo} alt="pp" className='w-[50px] h-[50px] rounded-full mr-2'/>
          <h3 className='mx-2 font-semibold '>{data?.host.first_name} {data?.host.last_name}</h3>
          <p className='text-sm text-fade_font'> {createdTime&&CalcTime(createdTime)}</p>
        </div>
        <div className='m-6'>
          <p className='mx-10' >{data?.description}</p>
        </div>
        <h4 className='font-semibold text-xl my-2'>Topic Tages</h4>
        <div className='my-4'> 
        {data?.topic?.map((el:topicDataType)=><button key={el.id} className={`${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} py-2 mr-6 px-4 my-4 rounded-full text-sm`} >{el.name}</button>)}
        </div>
        {leave_loading? <Loader text='Leaving room ..' />:join_error?<Error text='Error While joining Room !'/> :join_loading? <Loader text='Joining room ..' />:<div className={`px-2 py-3 rounded-xl hidden md:flex items-end justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}>
                    {(isParticipant||owner)? <textarea onChange={(e:any)=>handleauthOnchange(myData,e)} value={commentBody} className={`w-[80%] overflow-hidden bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri "} min-h-[20px] max-h-[200px] resize-none overflow-y-auto`} placeholder='Add Comment..'></textarea>:<p className='text-lg text-fade_font'>Please <span className='text-third_color underline cursor-pointer text-xl'onClick={()=>handleJoinRoom(myData,data.id)} >Join</span> the Room to Comment</p>}
                   {(isParticipant||owner)&&<TbSend onClick={()=>handleComment(data?.id)} className={`text-3xl ${(commentBody.length<4)?"text-fade_font/30":"cursor-pointer"}`} />}
                </div>}
      </div> 
      <div className='mt-12 mx-2'>
        <button onClick={()=>setShowComments(!showComments)} className='text-xl font-semibold my-4 flex items-center'>Discussions {showComments?<AiOutlineCaretUp  className='text-2xl mx-4 animate-in spin-in-90 duration-300'/>:<AiOutlineCaretDown  className='text-2xl mx-4 text-third_color animate-in spin-in-[-90deg] duration-300'/>}</button>
       {showComments&&<div className='animate-in slide-in-from-top-10'>
        <Comments canReply={isParticipant||owner} roomId={data.id} />
        </div>}
      </div>
    </div>
    {alertModal&&<Alert text="Join Room for sharing your Views" type='error' closeAlert={()=>setAlertModal(false)}  />}
    </>
  )
}

export default RoomData