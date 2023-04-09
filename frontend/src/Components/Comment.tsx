import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineLike } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { deleteComments, getRecentComments } from '../Redux/comments/comments.actions'
import { CalcTime } from './time'
import { TbSend } from 'react-icons/tb'
import { rootReducertype } from '../Redux/Store'
import { FiMoreHorizontal } from 'react-icons/fi'

const Comment = ({ data }: any) => {
  const dispatch: Dispatch<any> = useDispatch()
  const { myData } = useSelector((val: rootReducertype) => val?.auth)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)

  const [commentModal, setcommentModal] = useState(false)
  const [yourComment, setYourComment] = useState(false)
  const [commentBody, setCommentBody] = useState("")
  const [reply, setReply] = useState(false)

  useEffect(() => {
    dispatch(getRecentComments())
  }, [dispatch])
  let dynamicTime = new Date(data.created).getTime()
  const handleComment = (id: string | number) => {
    // dispatch  
  }
  useEffect(() => {
    if (data.user.id === myData.user_id) {
      setYourComment(true)
    }
  }, [data.user.id, myData.user_id])
  const handleEditModal= (e:any)=>{
    e.stopPropagation()
    setcommentModal(true)
  }
  // console.log(data)
  return (
    <div onClick={()=>setcommentModal(false)} className='border-2'>
      <div className='flex items-center relative w-fit'>
        <img src="/profile.svg" alt="pp" className='w-[40px] mr-2' />
        <h3 className='mx-2 font-semibold '>{data.user.first_name} {data.user?.last_name}</h3>
        {yourComment && <span className='mr-3 text-sm'>(You)</span>}
        <p className='text-sm'>{CalcTime(dynamicTime)}</p>
        <FiMoreHorizontal onClick={handleEditModal} className='text-xl cursor-pointer hover:text-third_color mx-8' />
        {commentModal && <div className='py-4 absolute w-fit top-[60%] bg-white right-[2%] p-2 font-semibold rounded-xl shadow-md'>
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
        </div>}
      </div>
      <div className={`m-3 px-[40px] ${reply ? "border-l-2" : ""} border-gray-400`}>
        <p>{data.body}</p>
        <div className='flex items-center'>
          <button onClick={() => setReply(!reply)} className='my-2 font-bold'>Reply</button>
          <AiOutlineLike className='mx-2 text-xl cursor-pointer' />
        </div>
        {reply && <div className={` px-2 py-3 rounded-full hidden md:flex justify-around ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"}`}>
          <input onChange={(e) => setCommentBody(e.target.value)} value={commentBody} type="text" className={`w-[80%] bg-bg_pri outline-none ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"}`} placeholder='reply here' />
          <TbSend onClick={() => handleComment(data?.id)} className='cursor-pointer text-3xl' />
        </div>}
      </div>
      {data.replies?.map((el: any, id: number) => <Comment key={id} data={el} />)}
    </div>
  )
}

export default Comment