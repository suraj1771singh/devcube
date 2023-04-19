import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { BiEdit } from 'react-icons/bi'
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
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const [photo, setPhoto] = useState("")
    const [profileHover, setProfileHover] = useState(false)
    useEffect(() => {
        setPhoto(data.pic)
        return () => {
            setPhoto('')
        }
    }, [data.pic])
    const handleEditProfile = ()=>{
       
        console.log('first')
    }

    return (
        <div onClick={() => closeModal()} className='z-50 fixed flex justify-center items-center bg-black/50 top-0 bottom-0 left-0 right-0'>
            <div onClick={(e) => e.stopPropagation()} className={`${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"} md:w-[50%] overflow-hidden shadow-xl rounded-2xl animate-in zoom-in-50 ease-in-out duration-500`}>
                <div className={`${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} p-10`}>
                    <div onMouseMove={()=>setProfileHover(true)} onMouseOut={()=>setProfileHover(false)} className='relative rounded-full'>
                        <img src={photo} alt="profile" className='rounded-full w-full' />
                        {data.owner ? profileHover && <div className='absolute bg-white/40 bottom-0 left-0 h-[20%] w-full flex justify-center items-center'>
                            <label>
                            <input type="file" accept='image/png,image/jpeg' className='hidden' onChange={handleEditProfile} />
                            <BiEdit className='text-6xl text-black cursor-pointer hover:text-third_color'/>
                            </label>
                        </div> : ""}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfilePhotoModal