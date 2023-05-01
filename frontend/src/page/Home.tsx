import { useEffect, useState } from 'react'
import RoomCard from '../Components/RoomCard'
import { IoAddSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { Dispatch } from 'redux'
import BrowseTopics from '../Components/BrowseTopics'
import RecentActivites from '../Components/RecentActivites'
import { NavLink, useNavigate } from 'react-router-dom'
import TagsDiv from '../Components/TagsDiv'
import { resetTopicTag } from '../Redux/topic/topic.actions'
import Error from '../Components/Error' 
import AllRoomsSkl from '../Components/skeletons/AllRoomsSkl'
import { roomDataDataType } from '../dataTypes'
const Home = () => {
    const dispatch: Dispatch<any> = useDispatch()
    let { allRooms, get_loading, get_error, allRoomsLength, search_loading, search_error } = useSelector((val: rootReducertype) => val.rooms)
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const { topicTags } = useSelector((val: rootReducertype) => val.topics)
    let { isAuth } = useSelector((val: rootReducertype) => val.auth)
    const nav = useNavigate()
    const [roomsArray, setRoomsArray] = useState<any>([])
    // check auth and fetch rooms
    useEffect(() => {
        if (!isAuth) {
            nav("/login")
        }
    }, [dispatch, isAuth, nav])
    useEffect(() => {
        setRoomsArray(allRooms)
    }, [allRooms])

    useEffect(() => {
        return () => {
            dispatch(resetTopicTag())
        }
    }, [dispatch])
    return (
        <>
            <div className='w-11/12 m-auto flex flex-col md:flex-row justify-between'>
                {/* lefe section => browse topics  */}
                <BrowseTopics />
                {/* for Mobile devices  */}
                <div className='md:hidden flex justify-between mb-4'>
                    <button className='border-2 border-third_color py-1 px-4 text-third_color rounded-full'>Borowse Topics</button>
                    <button className='border-2 border-third_color py-1 px-4 rounded-full text-third_color'>Popular Discussions</button>
                </div>
                {/* middle section => study rooms  */}
                {get_loading || search_loading ? <AllRoomsSkl />: 
                <div className='md:w-[54%] ml-[19.3%]'>
                    <div className={`flex items-center justify-between`} >
                        <div className={`${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} py-3 px-4 rounded-xl w-fit`}>
                            <h3 className='font-bold'>Study Rooms</h3>
                            <p className='text-fade_font text-sm font-semibold'>{allRoomsLength} Room(s) Available</p>
                        </div>
                        <p className='ml-2'>{(topicTags.length === 0) ? "" : `${topicTags.length}/5`}</p>
                        <div className={`flex items-center py-3 rounded-xl overflow-y-auto w-1/2 scrollbar box-border mr-2`} >
                         {topicTags&&<TagsDiv isCreate={false} />}
                        </div>
                        <NavLink to='/create_room' className='text-sm bg-third_color text-white text-semibold md:px-4 p-2 md:py-3 rounded-md flex items-center cursor-pointer md:text-md'> <IoAddSharp className='text-2xl md:mr-2' /> Create Room</NavLink>
                    </div>
                    <div className='ease-in-out duration-500'>
                        {get_error || search_error ? <Error text='Error While Fetching Rooms !' />: (roomsArray.length === 0) ? <p className='text-fade_font text-center my-10 text-xl'>No Records Found</p> : roomsArray?.map((el: roomDataDataType,id:number) => <RoomCard key={id} data={el} />)}
                    </div>
                </div>
                }

                {/* right section => recent acitivies  */}
                <RecentActivites />
            </div>
        </>
    )
}
export default Home