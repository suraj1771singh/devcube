import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { topicDataType } from '../dataTypes'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { removeTopicTag } from '../Redux/topic/topic.actions'
import { rootReducertype } from '../Redux/Store'

const TagsDiv = ({isCreate}:any) => {
    const dispatch:Dispatch<any> = useDispatch();
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  const {topicTags} =  useSelector((val:rootReducertype)=>val.topics)
  const [addTags,setAddTags]= useState<topicDataType[]>([])
  useEffect(()=>{
    setAddTags(topicTags)
    },[topicTags])
    useEffect(()=>{
      return()=>{
        console.log("tags over")
      }
    },[])
    const handleRemoveTag = (el:topicDataType)=>{
        dispatch(removeTopicTag(el))
      }
  return (
    <>
            <div className='text-fade_font flex items-center mr-3'>
            {isCreate&&<p className='py-2 mx-2'> Tags </p>}
           {isCreate&&<p>{addTags.length}/5 </p>}
            </div>
            <div className='flex'>
           {(addTags.length===0)?isCreate&&<p className="text-fade_font mx-2">Select Tags From Menu at left (min:1 max:5) </p>:addTags?.map((el:topicDataType,id:number)=><p key={id} className={`border-[1px] px-6 py-2 mx-2 flex items-center rounded-full whitespace-nowrap inline-block ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} animate-in slide-in-from-left-96 ease-in-out duration-500`}>{el.name}<span><AiOutlineClose onClick={()=>handleRemoveTag(el)} className='ml-3 cursor-pointer hover:text-red-400 font-bold'/> </span> </p> )}
            </div>
          </>
  )
}

export default TagsDiv