import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineLike } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { createComments, deleteComments, getRecentComments, getrepliesOfComment } from '../Redux/comments/comments.actions'
import { CalcTime } from './time'
import { TbSend } from 'react-icons/tb'
import { rootReducertype } from '../Redux/Store'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiMessageDetail } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const Comment = ({ data,canReply,roomId }: any) => {
  const dispatch: Dispatch<any> = useDispatch()
  const {myId } = useSelector((val: rootReducertype) => val?.auth)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  const {roomComments} = useSelector((val:rootReducertype)=>val.comments)

  const [commentReplyes, setCommentReplyes] = useState([])
  const nav = useNavigate()
  const [replyCalled, setReplyCalled] = useState(true)
  const [commentModal, setcommentModal] = useState(false)
  const [yourComment, setYourComment] = useState(false)
  const [showWriteComment, setShowWriteComment] = useState(false)
  const [commentBody, setCommentBody] = useState("")
  const [reply, setReply] = useState(false)
  useEffect(() => { 
    dispatch(getRecentComments())
    return ()=>{
      setReply(false)
    }
  }, [dispatch])
  useEffect(()=>{
    // eslint-disable-next-line array-callback-return
    setCommentReplyes(roomComments.filter((el:any)=>{
        if(el.parent===data.id){
            return el
        }
    }))
  },[data.id, roomComments.length,roomComments])
//   console.log(data)
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
    //dispatch for getting all the comments of the parent
    if(replyCalled){
        dispatch(getrepliesOfComment(id,roomId))
    }
    setReplyCalled(false)
    setReply(!reply)
  }
  const handleComment = (id: string | number) => {    
    if(commentBody.length>4){
      let msg = {body:commentBody,parent:id} 
     dispatch(createComments(msg,roomId))
    setCommentBody("")
  }else{
  }
  }
  return (
    <div onClick={()=>setcommentModal(false)} className=''>
      <div className='flex items-center relative w-fit'>
        <img src={data?.user?.photo} alt="pp" className='w-[40px] mr-2 rounded-full' />
        <h3 className='mx-2 font-semibold hover:text-third_color cursor-pointer' onClick={()=>nav(`/profile/${data.user.id}`)}>{data?.user?.first_name} {data?.user?.last_name}</h3>
        {yourComment && <span className='mr-3 text-sm'>(You)</span>}
        <p className='text-sm text-fade_font'>{CalcTime(dynamicTime)}</p>
        {yourComment&&<FiMoreHorizontal onClick={handleEditModal} className='text-xl cursor-pointer hover:text-third_color mx-8' />}
        {yourComment?commentModal&& <div className='py-4 absolute w-fit top-[60%] bg-white right-[2%] p-2 font-semibold rounded-xl shadow-md'>
          <div className='text-third_color my-2 cursor-pointer flex items-center'>
            <AiFillEdit className='mx-2' />
            <span className='mx-2'>
              Edit
            </span>
          </div>
          <div onClick={()=>dispatch(deleteComments(data.id))} className='text-red-400 my-2 cursor-pointer flex items-center'>
            <AiFillDelete className='mx-2' />
            <span className='mx-2'>
              Delete
            </span>
          </div>
        </div>:""
        }
      </div>
      <div className={`mx-3 px-[40px] ${reply ? "border-l-2" : ""} border-gray-400`}>
        <p className=''>{data?.body}</p>
        <div className='flex items-center'>
          <button onClick={()=>handleReplybtn(data.id)} className='my-2 font-bold hover:underline hover:text-blue-500'>{(data?.replies?.length!==0)&& <div className=' mr-4'>{data?.replies?.length} Reply</div>}</button>
         {data.height<2&&<BiMessageDetail className='ml-0 mr-4 text-xl cursor-pointer text-fade_font mt-2' onClick={()=>setShowWriteComment(!showWriteComment)} />}
          <AiOutlineLike className='mx-4 text-xl cursor-pointer text-fade_font m-2' />
        </div>
      {data.height<2&&reply&&commentReplyes?.map((el: any,id:number) => <Comment key={id} data={el} canReply={canReply} roomId={roomId} />)}
        {showWriteComment && (data?.height<2)?<div className={`px-2 py-3 rounded-xl hidden md:flex items-end justify-around ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}>
        {(canReply)?<textarea rows={2} onChange={(e)=>setCommentBody(e.target.value)} value={commentBody} className={`w-[80%] bg-bg_pri outline-none ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} placeholder='Add Comment..'></textarea>:<p className='text-gray-500'>Please Join Room to reply</p>}
        <TbSend onClick={()=>handleComment(data?.id)} className={`text-3xl ${(commentBody.length<4)?"text-gray-400":"cursor-pointer"}`} />
        </div>:<div>
          </div>}
      </div>
    </div>
  )
}

export default Comment