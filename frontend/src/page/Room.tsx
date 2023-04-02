import { Dispatch, useEffect } from 'react'
import BrowseTopics from '../Components/BrowseTopics'
import Participants from '../Components/Participants'
import RoomData from '../Components/RoomData'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRoombyId } from '../Redux/room/room.action'
import { rootReducertype } from '../Redux/Store'

const Room = () => {
    const {id} = useParams()
    const dispatch:Dispatch<any> = useDispatch()
    const {roomData} = useSelector((val:rootReducertype)=>val.rooms)
    useEffect(()=>{
        if(id){
            dispatch(getRoombyId(id))
        }
    },[dispatch, id])
  return (
    <div className='w-11/12 m-auto flex flex-col md:flex-row justify-between'>
                {/* section => browse topics  */}
                <BrowseTopics/>
                {/* for Mobile devices  */}
                <div className='md:hidden flex justify-between mb-4'>
                    <button className='border-2 border-third_color py-1 px-4 text-third_color rounded-full'>Borowse Topics</button>
                    <button className='border-2 border-third_color py-1 px-4 rounded-full text-third_color'>Recent Activites</button>
                </div>
                {/* middle section => Room's Data  */}
                <div className='md:w-[70%] mx-[20%] '>
                <RoomData data={roomData} />
                </div>
                {/* right section => recent acitivies  */}
                <Participants data={roomData?.Participants} />
            </div>
  )
}
export default Room