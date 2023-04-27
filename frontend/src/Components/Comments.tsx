import React, { useEffect, useState } from 'react'
import { rootReducertype } from '../Redux/Store'
import { useSelector } from 'react-redux'
import Comment from './Comment'

const Comments = ({canReply,roomId}:any) => {
  const [rootComments, setRootComments ] = useState([])
  const {roomComments} = useSelector((val:rootReducertype)=>val.comments)
  useEffect(()=>{
    // eslint-disable-next-line array-callback-return
    setRootComments(roomComments.filter((el:any)=>{
      if(!el.parent){
        return el
      }
    }))
  },[roomComments])
  return (
    <>
      {rootComments?.map((el:any)=><Comment key={el.id} data={el} roomId={roomId} canReply={canReply} />)}
    </>
  )
}
export default Comments