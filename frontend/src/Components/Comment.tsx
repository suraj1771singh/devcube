import React, { useEffect, useRef, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiFillLike, AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineLike } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { createComments, deleteComments, getRecentComments, getrepliesOfComment, likeMsg } from '../Redux/comments/comments.actions'
import { CalcTime } from './time'
import { TbSend } from 'react-icons/tb'
import { rootReducertype } from '../Redux/Store'
import { FiMoreHorizontal } from 'react-icons/fi'
import { GoReply } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { updateComments } from '../Redux/comments/comments.actions'
import { ClipLoader } from 'react-spinners'
import { joinRoom } from '../Redux/room/room.action'
import { commentDataDataType } from '../dataTypes'
interface propsType{
  data:commentDataDataType,
  canReply:boolean,
  roomId:number|string;
}
const Comment = ({ data,canReply,roomId }:propsType) => {
  const dispatch: Dispatch<any> = useDispatch()
  const {myId, myData} = useSelector((val: rootReducertype) => val?.auth)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  const {roomComments,get_reply_msg_loading,create_comment_loading,delete_comment_loading,} = useSelector((val:rootReducertype)=>val.comments)

  const [commentReplyes, setCommentReplyes] = useState([]) 
  const nav = useNavigate()
  const [replyCalled, setReplyCalled] = useState(true)
  const [commentModal, setcommentModal] = useState(false)
  const [showWriteComment, setShowWriteComment] = useState(false)
  const [commentBody, setCommentBody] = useState("")
  const [showUpdateComment,setShowUpdateComment] = useState(false);
  const [updateCommentData,setUpdateCommentData] = useState("");
  const [reply, setReply] = useState(false);
  const [msgLoading,setMsgLoading] = useState<boolean|undefined>(false)
  const [likedMsg,setLikedMsg] = useState<boolean|undefined>(data?.is_liked)
  const [createLoading,setCreateLoading] = useState(false)
  const [deleteLoading,setDeleteLoading] = useState(false);
  const [replyArr, setReplyArr] = useState<commentDataDataType[]>([])
  const [init, setInit] = useState(true)
  const refReply = useRef<HTMLTextAreaElement>(null)
  useEffect(()=>{
    if(!init){
      setReplyArr(commentReplyes)
    }
    if(commentReplyes.length>0){
      setInit(false)
    }
    if(init&&data){
      setReplyArr(data.replies)
  }
  },[commentReplyes, data, init])
  useEffect(()=>{
    if(!create_comment_loading){
      setCreateLoading(false)
    }
     if(!get_reply_msg_loading){
      setMsgLoading(false)
    }
    if(!delete_comment_loading){
      setDeleteLoading(false)
    }
  },[create_comment_loading, delete_comment_loading, get_reply_msg_loading])

  useEffect(() => { 
    dispatch(getRecentComments())
    return ()=>{
      setReply(false)
    }
  }, [dispatch])

  useEffect(()=>{
    setCommentReplyes(roomComments.filter((el:commentDataDataType)=>{
        if(el.parent===data?.id){
            return true
        }else{
          return false
        }
    }))
  },[data?.id, roomComments?.length,roomComments])
  
  const handleEditModal:React.MouseEventHandler<SVGElement>= (e)=>{
    e.stopPropagation()
    setcommentModal(true)
  }

  const handleReplybtn = (id:string|number)=>{
    setShowUpdateComment(false)
    setShowWriteComment(false)
    if(replyCalled){
        dispatch(getrepliesOfComment(id,roomId))
        setReplyCalled(false)
        setMsgLoading(true)
      }
    setReply(!reply)
  }

  const handleComment = (id: string | number) => {    
    if(commentBody.length>4){
      let msg = {body:commentBody,parent:id} 
     dispatch(createComments(msg,roomId))
    setCommentBody("");
    setShowWriteComment(false)
    setCreateLoading(true)
  }
  }

  const handleJoinRoom = (id:number)=>{
    let user = {id:myId,email:myData.email}
    dispatch(joinRoom(id,user))
  }
  const handleEditComment= (data:commentDataDataType)=>{
    setUpdateCommentData(data.body);
    setReply(false); 
    setShowWriteComment(false);
    setShowUpdateComment(!showUpdateComment)
  }
  const handleUpdateComment = (data:commentDataDataType)=>{
    data.body=updateCommentData;
    dispatch(updateComments(data))
    setShowUpdateComment(false)
  }
  const handleLikeMsg = (data:commentDataDataType)=>{
    dispatch(likeMsg(data.id))
    setLikedMsg(true)
    data.like_count = data.like_count+1 
  }
  const handleDislikeMsg = (data:commentDataDataType)=>{
    dispatch(likeMsg(data.id))
    setLikedMsg(false)
    data.like_count = data.like_count-1 
  }
  const handleDeleteComment = (id:number|string)=>{
    dispatch(deleteComments(id))
    setDeleteLoading(true);
  }
  const handleReplyMsg = ()=>{
    setReply(false);setShowUpdateComment(false); 
    setShowWriteComment(!showWriteComment);
    setTimeout(() => {
    if (refReply.current) {
        refReply.current.focus();
      }
    }, 600);
  }
  const hdnaleUpdateMsgChange:React.ChangeEventHandler<HTMLTextAreaElement> = (e)=>{
    setUpdateCommentData(e.target.value);
    e.target.style.height="auto"
    e.target.style.height= `${e.target.scrollHeight}px`;
  }
  const handleUpdateKeypress:React.KeyboardEventHandler<HTMLTextAreaElement> = (e)=>{
    // e.preventDefault()
    // if(e.key==="Enter"){
    //   setUpdateCommentData(updateCommentData + "\n")
    // }
  }
  const handleCommentKeyPress:React.KeyboardEventHandler<HTMLTextAreaElement>= (e)=>{

    // if(e.key==="Enter"){
    //   setCommentBody(commentBody + "n" )
    // }
  }
  const handleCommentBodyChange:React.ChangeEventHandler<HTMLTextAreaElement> = (e)=>{
    setCommentBody(e.target.value)
    e.target.style.height="auto";
    e.target.style.height= `${e.target.scrollHeight}px`;
  }
  return (
    <div onClick={()=>setcommentModal(false)} className=''>
      <div className='flex items-center relative w-fit'>
        <img src={data?.user?.photo} alt="pp" className='w-[40px] mr-2 rounded-full' />
        <h3 className='mx-2 font-semibold hover:text-third_color cursor-pointer' onClick={()=>nav(`/profile/${data.user.id}`)}>{data?.user?.first_name} {data?.user?.last_name}</h3>
        {data.user.id===myId && <span className='mr-3 text-sm'>(You)</span>}
        <p className='text-sm text-fade_font'>{CalcTime(new Date(data?.created).getTime())}</p>
        {data.user.id===myId&&<FiMoreHorizontal onClick={handleEditModal} className='text-xl cursor-pointer hover:text-third_color mx-8' />}
        {data.user.id===myId&&commentModal&& <div className={`w-fit p-2 font-semibold rounded-xl shadow-md border-[1px] border-fade_font`}>
          <div onClick={()=>handleEditComment(data)} className='hover:text-third_color my-2 cursor-pointer flex items-center'>
            <AiFillEdit className='mx-2' />
            <span className='mx-2'>
              Edit
            </span>
          </div>
          <div onClick={()=>{handleDeleteComment(data?.id)}} className='hover:text-red-400 my-2 cursor-pointer flex items-center'>
            <AiFillDelete className='mx-2' />
            <span className='mx-2'>
              Delete
            </span>
          </div>
        </div>}
      </div>
      <div className={`mx-3 px-[40px] ${reply ? "border-l-2" : ""} border-gray-400`}>
       {deleteLoading?<div className='mx-2'><ClipLoader color="#8001FF" /></div>:<p className=''>{data?.body}</p>}
        <div className='flex items-center'>
          <button onClick={()=>handleReplybtn(data.id)} className='my-2 font-bold hover:text-blue-500'>{(replyArr?.length!==0)&& <div className='mr-4 flex items-center'>{(replyArr?.length===1)?"1 Reply":`${replyArr?.length} Replies`} {reply ?<AiOutlineCaretUp  className=' mx-2 animate-in spin-in-90 duration-300'/>:<AiOutlineCaretDown  className='mx-2 animate-in spin-in-[-90deg] duration-300'/>} </div>}</button>
         {data.height<2&&<GoReply className='ml-0 mr-4 cursor-pointer hover:text-third_color underline' onClick={handleReplyMsg}/>}
          {likedMsg?<AiFillLike onClick={()=>handleDislikeMsg(data)} className='m-2 text-xl cursor-pointer text-blue-500 animate-in spin-in-[-90deg] ease-in-out duration-500'/>:
          <AiOutlineLike onClick={()=>handleLikeMsg(data)} className='text-xl cursor-pointer text-fade_font m-2 animate-in spin-in-90 ease-in-out duration-500'/>}
        <p className='text-sm' >{data?.like_count}</p>
        </div>
      {msgLoading? <div className='mx-2'><ClipLoader color="#8001FF" /></div> :data.height<2&&reply&&commentReplyes?.map((el: commentDataDataType,id:number) => <Comment key={id} data={el} canReply={canReply} roomId={roomId} />)}
      {createLoading&&<div className='mx-2'><ClipLoader color="#8001FF" /> </div>}
        {showWriteComment && (data?.height<2)?<div className={`px-2 py-3 my-2 rounded-xl hidden md:flex items-end justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} animate-in slide-in-from-top-5 ease-in-out duration-200`}>
        {canReply?<textarea onKeyDown={handleCommentKeyPress} ref={refReply} rows={2} onChange={handleCommentBodyChange} value={commentBody} className={`w-[80%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} min-h-12 max-h-[200px] resize-none overflow-y-auto`} placeholder='Write..'/>:<p className='text-fade_font'>Please <span className='text-third_color underline cursor-pointer' onClick={()=>handleJoinRoom(data?.room?.id)}>Join</span> Room to reply</p>}
        {canReply&&<TbSend onClick={()=>handleComment(data?.id)} className={`text-3xl ${(commentBody.length<4)?"text-gray-400":"cursor-pointer"}`} />}
        </div>:<div>
          </div>}
      </div>
      {showUpdateComment&&<div className={`px-2 py-3 my-2 rounded-xl hidden md:flex items-end justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}>
        <textarea  onKeyDown={handleUpdateKeypress} onChange={hdnaleUpdateMsgChange} value={updateCommentData} className={`w-[80%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} placeholder='Update your message..'></textarea>
        <TbSend onClick={()=>handleUpdateComment(data)} className={`text-3xl ${(updateCommentData.length<4)?"text-gray-400":"cursor-pointer"}`} />
        </div>}
    </div>
  )
}

export default Comment