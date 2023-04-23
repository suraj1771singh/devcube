import RoomCard from '../Components/RoomCard'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { BiEdit } from 'react-icons/bi'
import { Dispatch, useState } from 'react'
import { AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter } from 'react-icons/ai'
import { followUser } from '../Redux/user/user.actions'
import EditProfileModal from './EditProfileModal'
import { getRoomByUserId, getRoomsJoinedByUser } from '../Redux/room/room.action'
import ProfilePhotoModal from './ProfilePhotoModal'
const ProfileCard = ({ id }:any) => {
    let { allRooms } = useSelector((val: rootReducertype) => val.rooms)
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const { userData } = useSelector((val: rootReducertype) => val.user)
    let { myId } = useSelector((val: rootReducertype) => val.auth)
    const [editModal, setEditModal] = useState(false)
    const [hosted,setHosted] = useState(true)
    const [profileHover,setProfileHover] = useState(false)
    const [profilePhotoModal, setProfilePhotoModal] = useState(false)
    const [photo, setPhoto] = useState({owner:false, pic:''})
    const dispatch: Dispatch<any> = useDispatch()
    const handleProfileEdit = () => {
        setEditModal(true)
    }
    const closeEditModal = () => {
        setEditModal(false)
    }
    const handleFollow = (id: string | number) => {
        dispatch(followUser(id))
    } 
    const handleHostedRooms =  (id:string|number)=>{
        dispatch(getRoomByUserId(id))
        setHosted(true)
    }
    const handleJoinedRooms = ()=>{
        dispatch(getRoomsJoinedByUser())
        setHosted(false)
    }

    const handlePhotoModal = (owner:boolean,pic:string)=>{
        setPhoto({owner,pic})
        setProfilePhotoModal(true)
    }
    return (
        <>
            <div className='md:w-[54%] ml-[19.3%] my-[2%] animate-in slide-in-from-bottom-48 ease-in-out duration-500'>
                <div className={`my-1 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl shadow-md overflow-hidden`} >
                    {/* profile Div  */}
                    <div className='relative flex flex-col'>``
                        <div className='absolute left-0 top-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-32'></div>
                        <div className={`flex pb-4 px-4 items-center justify-between mt-28 `}>
                            <div className={`flex z-20 mt-[-10px]`}>
                                <div onMouseMove={()=>setProfileHover(true)} onMouseOut={()=>setProfileHover(false)} onClick={()=>handlePhotoModal(myId===(+id),userData?.photo)} className={`cursor-pointer border-4 ${drk_theme ? "border-bg_dark_sec":"border-bg_light_sec"} w-[120px] h-[120px] overfhow-hidden rounded-full z-20 relative overflow-hidden`}>
                                    <img src={userData?.photo} alt="profile" className='w-full rounded-full' />
                                   {myId === (+id) ? profileHover&&<div className='absolute bg-white/40 bottom-0 left-0 h-[50%] w-full flex justify-center items-center'>
                                   <BiEdit className='text-3xl text-black'/>
                                    </div>:""}
                                </div>
                                <div className='mx-4 pt-7'>
                                    <h2 className='text-2xl font-bold'>{userData?.first_name} {userData?.last_name} </h2>
                                    <p className='font-semibold'>{userData?.username}</p>
                                    <div className='flex justify-between pt-2'>
                                        {userData?.insta_url&&<a href={`${userData.insta_url}`} target='_blank' rel="noreferrer" ><AiOutlineInstagram className='text-3xl text-blue-500 cursor-pointer my-2 mr-3' /></a>}
                                       {userData?.linkedin_url&&<a href={`${userData.linkedin_url}`} target='_blank' rel="noreferrer"><AiOutlineLinkedin className='text-3xl text-blue-500 cursor-pointer my-2 mr-3' /></a>}
                                       {userData?.twitter_url&&<a href={`${userData.twitter_url}`} target='_blank' rel="noreferrer">< AiOutlineTwitter className='text-3xl text-blue-500 cursor-pointer my-2 mr-3' /></a>}
                                    </div>
                                    <div className='flex itemx-center'>
                                        <p className='font-semibold mr-3 text-sm'><span className='text-lg font-bold'>{}</span> Followers</p>
                                        <p className='font-semibold ml-3 text-sm'><span className='text-lg font-bold'>{userData?.following?.length}</span> Following</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 mr-10">
                                {myId === (+id) ? <BiEdit onClick={() => handleProfileEdit()} className='text-3xl cursor-pointer hover:text-third_color' /> : <button onClick={() => handleFollow(id)} className='text-xl bg-third_color text-font_dark_pri px-4 py-1 rounded-full'>Follow</button>}
                            </div>
                        </div>
                    </div>
                    <div className='m-4'>
                        <div className='p-4'>
                            <h2 className='font-bold text-xl'>Bio</h2>
                            <div className={`${drk_theme ? "text-font_dark_sec" : "text-font_light_sec"}`}>
                                {userData?.bio ? <p>{userData.bio}</p> : <p className='text-gray-500 text-center'>No Bio....</p>}
                            </div>
                        </div>
                        <div className='text-center'>
                            <button onClick={()=>handleHostedRooms(id)} className={`mx-3 ${hosted?"bg-third_color text-white":drk_theme ? "bg-bg_dark_pri" : "bg-bg_light_pri"} font-semibold p-2 px-5 rounded-full`} >Hosted</button>
                            <button onClick={()=>handleJoinedRooms()} className={`mx-3 ${!hosted?"bg-third_color text-white":drk_theme ? "bg-bg_dark_pri" : "bg-bg_light_pri"} font-semibold p-2 px-5 rounded-full`}>Joined</button>
                        </div>
                    </div>
                </div>
                {allRooms?.map((el: any) => <RoomCard key={el.id} data={el} />)}
                {(allRooms.length === 0) ? <h2 className='text-gray-500 text-center my-10 text-xl'>No Records found </h2> : ""}
            </div>
            {editModal && <EditProfileModal data={userData} closeModal={closeEditModal} />}
            {profilePhotoModal&&<ProfilePhotoModal data={photo} closeModal={()=>setProfilePhotoModal(false)} />}
        </>
    )
}

export default ProfileCard