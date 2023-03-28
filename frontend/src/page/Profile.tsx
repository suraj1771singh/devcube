import { useEffect, useState } from 'react'
import RoomCard from '../Components/RoomCard'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { getRooms } from '../Redux/room/room.action'
import { Dispatch } from 'redux'
import { getTopics } from '../Redux/topic/topic.actions'
import BrowseTopics from '../Components/BrowseTopics'
import RecentActivites  from '../Components/RecentActivites'
const Profile = () => {
    const dispatch: Dispatch<any> = useDispatch()
    let { allRooms } = useSelector((val: rootReducertype) => val.rooms)
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    useEffect(() => {
        dispatch(getRooms())
        dispatch(getTopics())
    }, [ dispatch])
    return (
        <> 
            <div className='w-11/12 m-auto flex flex-col md:flex-row justify-between'>
                {/* lefe section => browse topics  */}
                <BrowseTopics/>
                {/* for Mobile devices  */}
                <div className='md:hidden flex justify-between mb-4'>
                    <button className='border-2 border-third_color py-1 px-4 text-third_color rounded-full'>Borowse Topics</button>
                    <button className='border-2 border-third_color py-1 px-4 rounded-full text-third_color'>Recent Activites</button>
                </div>
                {/* middle section => study rooms  */}
                <div className='md:w-[54%] ml-[19.3%] my-[1%] '>
                <div className={`my-3 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl shadow-md overflow-hidden`} >
                    {/* profile Div  */}
                    <div className='h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
                    <div className='border-2 border-red-800 p-4'>
                    <div className='flex border-2'>
                        <div className='border-2 border-red-800 w-[100px] h-[100px] rounded-full'>
                            <img src="" alt="" />
                        </div>
                        <div>
                            <h2>Name </h2>
                            <p>Username</p>
                            <div>
                                <p>Followers</p>
                                <p>following</p>
                            </div>
                        </div>
                        </div>
                        <div className='m-6 p-2'>
                            <h2 className='font-bold text-xl' >Bio</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia fuga id repellendus porro, dignissimos at nobis aliquid assumenda ea, vero, consectetur provident optio explicabo eius perferendis culpa adipisci. Laudantium, voluptates?</p>
                        </div>
                        <div className=' text-center'>
                            <button className={`mx-3 bg-third_color font-semibold px-3 py-1 rounded-full text-white`} >Hosted</button>
                            <button className={`mx-3 border-2 ${drk_theme?"":""}`}>Joined</button>
                        </div>
                    </div>
                </div>
                {allRooms?.map((el: any) => <RoomCard key={el.id} data={el} />)}
                </div>
                {/* right section => recent acitivies  */}
                <RecentActivites/>
            </div>
        </>
    )
}
export default Profile