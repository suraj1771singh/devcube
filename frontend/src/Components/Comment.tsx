import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { createComments, deleteComments, getRecentComments, getrepliesOfComment, likeMsg } from '../Redux/comments/comments.actions'
import { CalcTime } from './time'
import { TbSend } from 'react-icons/tb'
import { rootReducertype } from '../Redux/Store'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiMessageDetail } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { updateComments } from '../Redux/comments/comments.actions'
import { ClipLoader } from 'react-spinners'

const Comment = ({ data,canReply,roomId }: any) => {
  const dispatch: Dispatch<any> = useDispatch()
  const {myId } = useSelector((val: rootReducertype) => val?.auth)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  const {roomComments,get_reply_msg_loading,create_comment_loading} = useSelector((val:rootReducertype)=>val.comments)

  const [commentReplyes, setCommentReplyes] = useState([])
  const nav = useNavigate()
  const [replyCalled, setReplyCalled] = useState(true)
  const [commentModal, setcommentModal] = useState(false)
  const [yourComment, setYourComment] = useState(false)
  const [showWriteComment, setShowWriteComment] = useState(false)
  const [commentBody, setCommentBody] = useState("")
  const [showUpdateComment,setShowUpdateComment] = useState(false);
  const [updateCommentData,setUpdateCommentData] = useState("");
  const [reply, setReply] = useState(false);
  const [msgLoading,setMsgLoading] = useState<boolean|undefined>(false)
  const [likedMsg,setLikedMsg] = useState<any|undefined>(data?.is_liked)
  const [createLoading,setCreateLoading] = useState(false)

  useEffect(()=>{
    if(!create_comment_loading){
      setCreateLoading(false)
    }
     if(!get_reply_msg_loading){
      setMsgLoading(false)
    }
  },[create_comment_loading, get_reply_msg_loading])

  useEffect(() => { 
    dispatch(getRecentComments())
    return ()=>{
      setReply(false)
    }
  }, [dispatch])

  useEffect(()=>{
    // eslint-disable-next-line array-callback-return
    setCommentReplyes(roomComments.filter((el:any)=>{
        if(el.parent===data?.id){
            return el
        }
    }))
  },[data?.id, roomComments?.length,roomComments])
  
  let dynamicTime = new Date(data?.created).getTime()
  useEffect(() => {
    if (data?.user?.id === myId) {
      setYourComment(true)
    }
  }, [data?.user?.id, myId])

  const handleEditModal= (e:any)=>{
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
    data.replies.push(id)
  }
  }

  const handleEditComment = (data:any)=>{
    setUpdateCommentData(data.body);
    setReply(false); 
    setShowWriteComment(false);
    setShowUpdateComment(!showUpdateComment)
  }
  const handleUpdateComment = (data:any)=>{
    data.body=updateCommentData;
    dispatch(updateComments(data))
    setShowUpdateComment(false)
  }
  const handleLikeMsg = (data:any)=>{
    dispatch(likeMsg(data.id))
    setLikedMsg(true)
    data.like_count = data.like_count+1 
  }
  const handleDislikeMsg = (data:any)=>{
    dispatch(likeMsg(data.id))
    setLikedMsg(false)
    data.like_count = data.like_count-1 
  }
  const handleDeleteComment = (data:any)=>{
    data.replies.pop()
    dispatch(deleteComments(data.id))
  }
  return (
    <div onClick={()=>setcommentModal(false)} className=''>
      <div className='flex items-center relative w-fit'>
        <img src={data?.user?.photo} alt="pp" className='w-[40px] mr-2 rounded-full' />
        <h3 className='mx-2 font-semibold hover:text-third_color cursor-pointer' onClick={()=>nav(`/profile/${data.user.id}`)}>{data?.user?.first_name} {data?.user?.last_name}</h3>
        {yourComment && <span className='mr-3 text-sm'>(You)</span>}
        <p className='text-sm text-fade_font'>{CalcTime(dynamicTime)}</p>
        {yourComment&&<FiMoreHorizontal onClick={handleEditModal} className='text-xl cursor-pointer hover:text-third_color mx-8' />}
        {yourComment&&commentModal&& <div className='py-4 absolute w-fit top-[60%] bg-white right-[2%] p-2 font-semibold rounded-xl shadow-md'>
          <div onClick={()=>handleEditComment(data)} className='text-third_color my-2 cursor-pointer flex items-center'>
            <AiFillEdit className='mx-2' />
            <span className='mx-2'>
              Edit
            </span>
          </div>
          <div onClick={()=>{handleDeleteComment(data)}} className='text-red-400 my-2 cursor-pointer flex items-center'>
            <AiFillDelete className='mx-2' />
            <span className='mx-2'>
              Delete
            </span>
          </div>
        </div>}
      </div>
      <div className={`mx-3 px-[40px] ${reply ? "border-l-2" : ""} border-gray-400`}>
        <p className=''>{data?.body}</p>
        <div className='flex items-center'>
          <button onClick={()=>handleReplybtn(data.id)} className='my-2 font-bold hover:underline hover:text-blue-500'>{(data?.replies?.length!==0)&& <div className=' mr-4'>{data.replies.length} Reply</div>}</button>
         {data.height<2&&<BiMessageDetail className='ml-0 mr-4 text-xl cursor-pointer text-fade_font mt-2' onClick={()=>{setReply(false);setShowUpdateComment(false); setShowWriteComment(!showWriteComment)}} />}
          {likedMsg?<AiFillLike onClick={()=>handleDislikeMsg(data)} className='m-2 text-xl cursor-pointer text-blue-500 animate-in spin-in-90 ease-in-out duration-200'/>:
          <AiOutlineLike onClick={()=>handleLikeMsg(data)} className='text-xl cursor-pointer text-fade_font m-2 animate-in spin-in-90 ease-in-out duration-200'/>
        }
        <p className='text-sm' >{data?.like_count}</p>
        </div>
      {msgLoading? <div className='mx-2'><ClipLoader color="#8001FF" /></div> :data.height<2&&reply&&commentReplyes?.map((el: any,id:number) => <Comment key={id} data={el} canReply={canReply} roomId={roomId} />)}
      {createLoading&&<div className='mx-2'><ClipLoader color="#8001FF" /> </div>}
        {showWriteComment && (data?.height<2)?<div className={`px-2 py-3 my-2 rounded-xl hidden md:flex items-end justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} animate-in slide-in-from-top-5 ease-in-out duration-200`}>
        {(canReply)?<textarea rows={2} onChange={(e)=>setCommentBody(e.target.value)} value={commentBody} className={`w-[80%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} placeholder='Reply to the message..'></textarea>:<p className='text-gray-500'>Please Join Room to reply</p>}
        <TbSend onClick={()=>handleComment(data?.id)} className={`text-3xl ${(commentBody.length<4)?"text-gray-400":"cursor-pointer"}`} />
        </div>:<div>
          </div>}
      </div>
      {showUpdateComment&&<div className={`px-2 py-3 my-2 rounded-xl hidden md:flex items-end justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}>
        <textarea rows={2} onChange={(e)=>setUpdateCommentData(e.target.value)} value={updateCommentData} className={`w-[80%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} placeholder='Update your message..'></textarea>
        <TbSend onClick={()=>handleUpdateComment(data)} className={`text-3xl ${(updateCommentData.length<4)?"text-gray-400":"cursor-pointer"}`} />
        </div>}
    </div>
  )
}

export default Comment