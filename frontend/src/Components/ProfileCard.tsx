import RoomCard from '../Components/RoomCard'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { BiEdit } from 'react-icons/bi'
import { Dispatch, useEffect, useState } from 'react'
import { AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter } from 'react-icons/ai'
import { followUser, unfollowUser } from '../Redux/user/user.actions'
import EditProfileModal from './EditProfileModal'
import { getRoomByUserId, getRoomsJoinedByUser } from '../Redux/room/room.action'
import ProfilePhotoModal from './ProfilePhotoModal'
import Loader from './Loader'
import Error from './Error'
import ProfileSkl from './skeletons/ProfileSkl'
const ProfileCard = ({ id }: any) => {
    let { userRooms, get_user_rooms_loading, get_user_rooms_error, get_user_joined_rooms_loading,
        get_user_joined_rooms_error } = useSelector((val: rootReducertype) => val.rooms)
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const { get_user_loading, userData, followers, following, get_user_error } = useSelector((val: rootReducertype) => val.user)
    let { myId } = useSelector((val: rootReducertype) => val.auth)
    const [editModal, setEditModal] = useState(false)
    const [hosted, setHosted] = useState(true)
    const [profileHover, setProfileHover] = useState(false)
    const [profilePhotoModal, setProfilePhotoModal] = useState(false)
    const [photo, setPhoto] = useState({ owner: false, pic: '' })
    const [isfollowing, setIsFollowing] = useState(false);
    const [usersData, setUsersData] = useState<any>(null);
    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        let youFollowing = followers.filter((el: any) => {
            if (el.id === myId) {
                return el
            }
        })
        if (youFollowing.length === 0) {
            setIsFollowing(false)
        } else {
            setIsFollowing(true)
        }
    }, [followers, myId])
    useEffect(() => {
        setUsersData(userData);
        return () => {
            setUsersData(null)
        }
    }, [userData])
    const dispatch: Dispatch<any> = useDispatch()
    const handleProfileEdit = () => {
        setEditModal(true)
    }
    const closeEditModal = () => {
        setEditModal(false)
    }
    const handleFollow = (id: string | number) => {
        dispatch(followUser(id))
        setIsFollowing(true)
        followers.length = followers.length + 1
    }
    const handleUnfollow = (id: string | number) => {
        dispatch(unfollowUser(id))
        setIsFollowing(false)
        followers.length = followers.length - 1
    }
    const handleHostedRooms = (id: string | number) => {
        dispatch(getRoomByUserId(id))
        setHosted(true)
    }
    const handleJoinedRooms = () => {
        dispatch(getRoomsJoinedByUser())
        setHosted(false)
    }
    const handlePhotoModal = (owner: boolean, pic: string) => {
        setPhoto({ owner, pic })
        setProfilePhotoModal(true)
    }
    return (
        <>
            <div className='md:w-[54%] ml-[19.3%] animate-in slide-in-from-bottom-48 ease-in-out duration-500'>
                <div className={`${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl shadow-md overflow-hidden`} >
                    {/* profile Div  */}
                    {get_user_error ? <div className='w-full h-52 flex justify-center items-center'><Error text='Error while Getting User Details !' /></div> : get_user_loading ?<ProfileSkl/>: <div className='' >
                        <div className='relative flex flex-col'>
                            <div className='absolute left-0 top-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-32'></div>
                            <div className={`flex pb-4 px-4 items-center justify-between mt-28 `}>
                                <div className={`flex z-20 mt-[-10px]`}>
                                    <div onMouseMove={() => setProfileHover(true)} onMouseOut={() => setProfileHover(false)} onClick={() => handlePhotoModal(myId === (+id), usersData?.photo)} className={`cursor-pointer border-4 ${drk_theme ? "border-bg_dark_sec" : "border-bg_light_sec"} w-[120px] h-[120px] overfhow-hidden rounded-full z-20 relative overflow-hidden`}>
                                        <img src={usersData?.photo} alt="profile" className='w-full rounded-full' />
                                        {myId === (+id) && profileHover && <div className='absolute bg-white/40 bottom-0 left-0 h-[50%] w-full flex justify-center items-center'>
                                            <BiEdit className='text-3xl text-black' />
                                        </div>}
                                    </div>
                                    <div className='mx-4 pt-7'>
                                        <h2 className='text-2xl font-bold'>{usersData?.first_name} {usersData?.last_name} </h2>
                                        <p className='font-semibold'>{usersData?.username}</p>
                                        <div className='flex justify-between pt-2'>
                                            {usersData?.insta_url && <a href={`${usersData.insta_url}`} target='_blank' rel="noreferrer" ><AiOutlineInstagram className='text-3xl text-blue-500 cursor-pointer my-2 mr-3' /></a>}
                                            {usersData?.linkedin_url && <a href={`${usersData.linkedin_url}`} target='_blank' rel="noreferrer"><AiOutlineLinkedin className='text-3xl text-blue-500 cursor-pointer my-2 mr-3' /></a>}
                                            {usersData?.twitter_url && <a href={`${usersData.twitter_url}`} target='_blank' rel="noreferrer">< AiOutlineTwitter className='text-3xl text-blue-500 cursor-pointer my-2 mr-3' /></a>}
                                        </div>
                                        <div className='flex itemx-center'>
                                            <p className='font-semibold mr-3 text-sm'><span className='text-lg font-bold'>{followers.length}</span> Followers</p>
                                            <p className='font-semibold ml-3 text-sm'><span className='text-lg font-bold'>{following?.length}</span> Following</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 mr-10">
                                    {myId === (+id) ? <BiEdit onClick={() => handleProfileEdit()} className='text-3xl cursor-pointer hover:text-third_color' /> : isfollowing ? <button onClick={() => handleUnfollow(id)} className="bg-red-200 px-4 py-2 rounded-full text-third_color animate-in zoom-in ease-in-out">Unfollow</button> : <div onClick={() => handleFollow(id)} className='bg-blue-200 px-4 py-2 rounded-full text-third_color animate-in zoom-in ease-in-out cursor-pointer'>Follow</div>}
                                </div>
                            </div>
                        </div>
                        <div className='m-4'>
                            <div className='p-4'>
                                <h2 className='font-bold text-xl'>Bio</h2>
                                <div className={`${drk_theme ? "text-font_dark_sec" : "text-font_light_sec"}`}>
                                    {usersData?.bio ? <p>{usersData.bio}</p> : <p className='text-fade_font text-center'>No Bio....</p>}
                                </div>
                            </div>
                            <div className='text-center'>
                                <button onClick={() => handleHostedRooms(id)} className={`mx-3 ${hosted ? "bg-third_color text-white" : drk_theme ? "bg-bg_dark_pri" : "bg-bg_light_pri"} font-semibold p-2 px-5 rounded-full`} >Hosted</button>
                                <button onClick={() => handleJoinedRooms()} className={`mx-3 ${!hosted ? "bg-third_color text-white" : drk_theme ? "bg-bg_dark_pri" : "bg-bg_light_pri"} font-semibold p-2 px-5 rounded-full`}>Joined</button>
                            </div>
                        </div>
                    </div>}
                </div>
                {get_user_rooms_error || get_user_joined_rooms_error ? <div className='my-4'> <Error text='Something Went Wrong !' /></div> : get_user_rooms_loading || get_user_joined_rooms_loading ? <div className='my-4'><Loader text='Fetching Data' /></div> : (userRooms?.length === 0) ? <h2 className='text-fade_font text-center my-10 text-xl'>No Records found </h2> : userRooms?.map((el: any) => <RoomCard key={el.id} data={el} />)}
            </div>
            {editModal && <EditProfileModal data={usersData} closeModal={closeEditModal} />}
            {profilePhotoModal && <ProfilePhotoModal data={photo} closeModal={() => setProfilePhotoModal(false)} />}
        </>
    )
}
export default ProfileCard