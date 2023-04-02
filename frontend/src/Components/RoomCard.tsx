import { useDispatch, useSelector } from 'react-redux';
import { rootReducertype } from '../Redux/Store';
import { CalcTime } from './time';
import { GrGroup } from 'react-icons/gr'
import { FiMoreHorizontal } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom';
import { Dispatch } from 'react';
import { joinRoom } from '../Redux/room/room.action';

const RoomCard = (props: any) => {
    const dispatch:Dispatch<any> = useDispatch()
    const { data } = props;
    let date = data.created;
    let dt = new Date(date).getTime()
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const { allTopics } = useSelector((val: rootReducertype) => val.topics)
    let title = ''
    const nav = useNavigate()
    allTopics.forEach((element: any) => {
        if (element.id === data.topic) {
            title = element.name
        }
    });
    const handleJoinRoom = (id:number|string)=>{
       dispatch(joinRoom(id))
    }
    const handleGotoRoom = (id:string|number)=>{
        nav(`/room/${id}`)
    }
    return (
        <div className={`my-3 ${drk_theme ?"bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl p-6 shadow-md hover:shadow-xl`} >
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='border-2 relative border-third_color w-[50px] h-[50px] rounded-full'>
                        <img src="/profile.svg" alt="dp" />
                        {/* <div className={`h-3 w-3 rounded-full bg-green-500 absolute bottom-0 right-0 `}></div> */}
                    </div>
                    <NavLink to={`/profile/${data.host}`} className='mx-2 hover:text-third_color cursor-pointer'>@{data?.hostname}</NavLink>
                </div>
                <div className={`flex flex-col items-end h-[100%]`}>
                    <FiMoreHorizontal className='text-xl cursor-pointer hover:text-third_color' />
                    <p className='text-xs font-semibold'>
                        {CalcTime(dt)}
                    </p>
                </div>
            </div>
            <h3 className='font-semibold text-xl mt-2'>{data?.name}</h3>
            <div className='text-left mt-2 mb-2'>
                <p className=''>{data?.description}</p>
            </div>
            <div className='flex justify-between mt-6' >
                <div className='flex items-center'>
                    <button onClick={()=>handleJoinRoom(data.id)} className='bg-third_color px-6 rounded-full text-semibold text-white text-center py-2 mr-4'>Join</button>
                    <GrGroup className='text-sm mx-2 text-gray-600' />
                    <p className='text-sm text-gray-600'> {data?.participants.length} Joined</p>
                </div>
                <div className='flex'>
                    <button onClick={()=>handleGotoRoom(data?.id)} className={`flex justify-center items-center px-6 py-2 font-semibold rounded-full mx-2 ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} >{title}</button>
                </div>
            </div>
        </div>
    ) 
}

export default RoomCard