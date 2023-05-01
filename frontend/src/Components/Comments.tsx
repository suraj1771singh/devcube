import React, { useEffect, useState } from 'react'
import { rootReducertype } from '../Redux/Store'
import { useSelector } from 'react-redux'
import Comment from './Comment'
import { commentDataDataType } from '../dataTypes';
interface propsType{
  canReply:boolean;
  roomId:number|string;
}
const Comments = ({canReply,roomId}:propsType) => {
  const [rootComments, setRootComments ] = useState([])
  const {roomComments} = useSelector((val:rootReducertype)=>val.comments)
  useEffect(()=>{
    setRootComments(roomComments.filter((el:commentDataDataType)=>{
      if(!el.parent){
        return true
      }else{
        return false
      }
    }))
  },[roomComments])
  return (
    <>
      {rootComments?.map((el:commentDataDataType)=><Comment key={el.id} data={el} roomId={roomId} canReply={canReply} />)}
    </>
  )
}
export default Comments