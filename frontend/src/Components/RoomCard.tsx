import { useDispatch, useSelector } from 'react-redux';
import { rootReducertype } from '../Redux/Store';
import { CalcTime } from './time';
import { GrGroup } from 'react-icons/gr'
import { FiMoreHorizontal } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom';
import { Dispatch, useEffect, useState } from 'react';
import { joinRoom } from '../Redux/room/room.action';
import { loggedinUserType, roomDataDataType, topicDataType } from '../dataTypes';
import React from 'react';

interface propsType{
    data:roomDataDataType
}
const RoomCard = ({ data }: propsType) => {
    const dispatch: Dispatch<any> = useDispatch()
    const { join_loading } = useSelector((val: rootReducertype) => val.rooms);
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const { myData, myId } = useSelector((val: rootReducertype) => val?.auth)
    const [joined, setJoined] = useState(false)
    const [owner, setOwner] = useState(false)
    const [joiningRoomLoading,setJoiningRoomLoading]= useState<boolean|undefined>(false)
    const nav = useNavigate()
    useEffect(()=>{
        if(!join_loading){
            setJoiningRoomLoading(false)
        }
    },[join_loading])
    useEffect(() => {
        setJoined(data?.participants.some((el: any) => el.id === myId))
        if (data.host.id === myId) {
            setOwner(true)
        }
    }, [data.host.id, data?.participants, data?.participants.length, myId])

    const handleJoinRoom = (myData:loggedinUserType,id: string | number) => {
        if(myData){
            let user = { id: myId, email: myData.email}
            dispatch(joinRoom(id, user))
            setJoiningRoomLoading(true)
        }
    }

    const handleGotoRoom = (id: string | number) => {
        nav(`/room/${id}`)
    }
    let date = data.created;
    let dynamicTime = new Date(date).getTime()
    let desc = data?.description.split(' ').slice(0,50).join(" ")
    return (
        <div className={`my-3 ${drk_theme ?"bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl p-6 shadow-md hover:shadow-xl`} >
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='border-2 relative border-third_color w-[50px]  h-[50px] rounded-full'>
                        <img src={data.host?.photo} alt="dp" className='rounded-full' />
                    </div>
                    <NavLink to={`/profile/${data.host.id}`} className='mx-2 hover:text-third_color cursor-pointer'>@{data?.host.email} {owner ? "(You)" : ""} </NavLink>
                </div>
                <div className={`flex flex-col items-end h-[100%]`}>
                    <FiMoreHorizontal className='text-xl cursor-pointer hover:text-third_color' />
                    <p className='text-fade_font text-xs font-semibold'>
                        {CalcTime(dynamicTime)}
                    </p>
                </div>
            </div>
            <div onClick={() => handleGotoRoom(data?.id)} className='text-left mt-2 mb-2 cursor-pointer'>
                <h3 className='font-semibold text-[20px] my-2'>{data?.name}</h3>
                <p className={`${drk_theme && "font_dark_sec font-light"}`}>{desc}</p>
            </div>
            <div className='flex justify-between mt-6' >
                <div className='flex items-center'>
                    {
                        owner ? <div></div> : joined ? <div className={`flex justify-center items-center px-6 py-2 font-semibold rounded-full mx-2 ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"}`}>Joined</div> : <button onClick={() => handleJoinRoom(myData,data.id)} className='bg-third_color px-6 rounded-full text-semibold text-white text-center py-2 mr-4'>{joiningRoomLoading ? "Loading..." : "Join"}</button>}
                    <GrGroup className={`mx-2 text-third_color bg-third-color`} />
                    <p className='text-fade_font text-sm font-semibold'> {data?.participants.length} Joined</p>
                </div>
                <div className='flex max-w-[60%] overflow-auto scrollbar-hide'>
                    {data?.topic?.map((el: topicDataType) => <div key={el.id} className={`flex justify-center items-center px-6 py-2 font-semibold rounded-full mx-2 whitespace-nowrap ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"}`} >{el.name}</div>)}
                </div>
            </div>
        </div>
    )
}

export default React.memo(RoomCard,()=>false)