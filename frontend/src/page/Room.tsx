import { Dispatch, useEffect } from 'react'
// import BrowseTopics from '../Components/BrowseTopics'
import Participants from '../Components/Participants'
import RoomData from '../Components/RoomData'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRoombyId } from '../Redux/room/room.action'
import { rootReducertype } from '../Redux/Store'
import { getRecentComments, getRoomComments } from '../Redux/comments/comments.actions'
import Error from '../Components/Error'
import RoomDataSkl from '../Components/skeletons/RoomDataSkl'
import ParticipantsSkl from '../Components/skeletons/ParticipantsSkl'

const Room = () => {
    const {id} = useParams()
    const dispatch:Dispatch<any> = useDispatch()
    const {roomData,get_room_by_id_loading,get_room_by_id_error,} = useSelector((val:rootReducertype)=>val.rooms)
    useEffect(()=>{
        if(id){
            dispatch(getRoombyId(id))
            dispatch(getRoomComments(id))
            dispatch(getRecentComments())
        }
    },[dispatch, id])
  return (
    <div className=' m-auto flex flex-col md:flex-row justify-between'>
                {/* section => browse topics  */}
                {/* <BrowseTopics/> */}
                {/* for Mobile devices  */}
                <div className='md:hidden flex justify-between mb-4'>
                    <button className='border-2 border-third_color py-1 px-4 text-third_color rounded-full'>Borowse Topics</button>
                    <button className='border-2 border-third_color py-1 px-4 rounded-full text-third_color'>Recent Activites</button>
                </div>
                {/* middle section => Room's Data  */}
                <div className='w-[74%] mr-[30%] ml-[4%]'>
                    {get_room_by_id_loading?<RoomDataSkl/> :get_room_by_id_error?<div> <Error text='Error Wnile Fetching Room !' /> </div>:roomData&&<RoomData data={roomData} />}
                </div>
                {/* right section => recent acitivies  */}
            {get_room_by_id_loading?<ParticipantsSkl/>:<Participants data={roomData?.participants} />}
            </div>
  )
} 
export default Room