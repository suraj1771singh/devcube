import { useEffect} from 'react'
import { useDispatch} from 'react-redux'
import { getRooms } from '../Redux/room/room.action'
import { Dispatch } from 'redux'
import { getTopics } from '../Redux/topic/topic.actions'
import BrowseTopics from '../Components/BrowseTopics'
import RecentActivites  from '../Components/RecentActivites'
import ProfileCard from '../Components/ProfileCard'
const Profile = () => {
    const dispatch: Dispatch<any> = useDispatch()
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
                <ProfileCard/>
                {/* right section => recent acitivies  */}
                <RecentActivites/>
            </div>
        </>
    )
}
export default Profile