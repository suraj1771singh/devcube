import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { BiEdit } from 'react-icons/bi'
import { Dispatch } from 'redux'
import { updateUser, updateUserProfile } from '../Redux/user/user.actions'
import { MdFileDownloadDone } from 'react-icons/md'
import Loader from './Loader'
interface propsdata {
    owner: boolean,
    pic: string
}
interface props {
    data: propsdata,
    closeModal(): void
}
const ProfilePhotoModal = (props: props) => {
    const { data, closeModal } = props;
    const dispatch: Dispatch<any> = useDispatch();
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const {userData} = useSelector((val: rootReducertype) => val.user)
    let { get_photo_loading, new_photo } = useSelector((val: rootReducertype) => val.user)
    const [photo, setPhoto] = useState("")
    const [profileHover, setProfileHover] = useState(false)
    useEffect(() => {
        if (new_photo) {
            setPhoto(new_photo)
        } else {
            setPhoto(data.pic)
        }
        return () => {
            setPhoto('')
        }
    }, [data.pic, new_photo])
    const handleEditProfile:React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        if(e.target.files){
            dispatch(updateUserProfile(e.target.files[0]))
        }
    }
    const handleProfileUpdate = (img: string) => {
        userData.photo=img;
        dispatch(updateUser(userData))
        closeModal()
    }
    return (
        <div onClick={() => closeModal()} className='z-50 fixed flex justify-center items-center bg-black/50 top-0 bottom-0 left-0 right-0'>
            <div onClick={(e) => e.stopPropagation()} className={`${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"} md:w-[50%] overflow-hidden shadow-xl rounded-2xl animate-in zoom-in-50 ease-in-out duration-500`}>
                <div className={`${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} p-10 flex justify-center items-center`}>
                {get_photo_loading?<Loader text={"Uploading Photo..."} />:
                    <div onMouseMove={() => setProfileHover(true)} onMouseOut={() => setProfileHover(false)} className='relative rounded-full overflow-hidden h-[600px] w-[600px] '>
                        <img src={photo} alt="profile" className='min-w-[600px] min-h-[600px] h-fit w-fit' />
                        {data.owner && profileHover && <div className='absolute bg-white/40 bottom-0 left-0 h-[20%] w-full flex justify-center items-center'>
                            {new_photo ? <MdFileDownloadDone onClick={() => handleProfileUpdate(new_photo)} className='text-6xl text-black cursor-pointer hover:text-third_color ' /> : <label>
                                <input type="file" accept='image/png,image/jpeg' className='hidden' onChange={handleEditProfile} />
                                <BiEdit className='text-6xl text-black cursor-pointer hover:text-third_color' />
                            </label>
                            }
                        </div>}
                    </div>}
                </div>

            </div>
        </div>
    )
}

export default ProfilePhotoModal