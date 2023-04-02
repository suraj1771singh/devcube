import { useEffect, useState } from 'react'
import RoomCard from '../Components/RoomCard'
import { IoAddSharp } from 'react-icons/io5'
import CreateRoomModal from '../Components/CreateRoomModal'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { getRooms } from '../Redux/room/room.action'
import { Dispatch } from 'redux'
import BrowseTopics from '../Components/BrowseTopics'
import RecentActivites  from '../Components/RecentActivites'
const Home = () => {
    const [createRoom, setCreateRoom] = useState(false)
    const dispatch: Dispatch<any> = useDispatch()
    let { allRooms } = useSelector((val: rootReducertype) => val.rooms)
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    useEffect(() => {
        dispatch(getRooms())
        // dispatch(getTopics())
    }, [ dispatch])
    
    const openCreateModal = () => {
        setCreateRoom(true)
    }
    const closeCreateModal = () => {
        setCreateRoom(false)
    }
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
                <div className='md:w-[54%] ml-[19.3%]'>
                    <div className={`flex items-center justify-between`} >
                        <div className={`${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} py-3 px-4 rounded-xl`}>
                            <h3 className='font-bold'>Study Rooms</h3>
                            <p className='text-gray-500 text-sm font-semibold'>3,84473 Rooms Available</p>
                        </div>
                        <button onClick={openCreateModal} className='text-sm bg-third_color text-bg_pri font-semibold md:px-4 p-2 md:py-2 rounded-md flex items-center cursor-pointer md:text-md'> <IoAddSharp className='text-2xl md:mr-2' /> Create Room</button>
                    </div>
                    <div className='ease-in-out duration-500 animate-in slide-in-from-bottom-48 '>
                    {allRooms?.map((el: any) => <RoomCard key={el.id} data={el} />)}
                    </div>
                </div>
                {/* right section => recent acitivies  */}
                <RecentActivites/>
            </div>
            {createRoom && <CreateRoomModal closeCreateModal={closeCreateModal} />}
        </>
    )
}
export default Home