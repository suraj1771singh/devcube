import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineLike } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { createComments, deleteComments, getRecentComments, getrepliesOfComment } from '../Redux/comments/comments.actions'
import { CalcTime } from './time'
import { TbSend } from 'react-icons/tb'
import { rootReducertype } from '../Redux/Store'
import { FiMoreHorizontal } from 'react-icons/fi'
import { MdOutlineReport } from 'react-icons/md'

const Replyes = ({data}:any) => {
  const dispatch: Dispatch<any> = useDispatch()
  const {myId } = useSelector((val: rootReducertype) => val?.auth)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  const [commentModal, setcommentModal] = useState(false)
  const [yourComment, setYourComment] = useState(false)
  const [commentBody, setCommentBody] = useState("")
  const [reply, setReply] = useState(false)
  
  const handleEditModal= (e:any)=>{
    e.stopPropagation()
    setcommentModal(true)
  }
  return (
    <div onClick={()=>setcommentModal(false)} className=''>
      <div className='flex items-center relative w-fit'>
        <img src="/profile.svg" alt="pp" className='w-[40px] mr-2' />
        <h3 className='mx-2 font-semibold '>{data?.user?.first_name} {data?.user?.last_name}</h3>
        {/* {yourComment && <span className='mr-3 text-sm'>(You)</span>} */}
        {/* <p className='text-sm'>{CalcTime(dynamicTime)}</p> */}
        <FiMoreHorizontal onClick={handleEditModal} className='text-xl cursor-pointer hover:text-third_color mx-8' />
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
        </div>:commentModal&&<div className='py-4 absolute w-fit top-[60%] bg-white right-[2%] p-2 font-semibold rounded-xl shadow-md'>
          <div className='text-red-400 mb-2 cursor-pointer flex items-center'>
              <MdOutlineReport className='mx-2'/>
               <span className='mx-2'>
                Report
                </span>  
            </div>
        </div>
        }
      </div>
      <div className={`m-3 px-[40px] ${reply ? "border-l-2" : ""} border-gray-400`}>
        <p>{data?.body}</p>
        <div className='flex items-center'>
          <AiOutlineLike className='mx-2 text-xl cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Replyes