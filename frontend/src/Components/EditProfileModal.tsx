import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { Dispatch } from 'redux';
import { updateUser } from '../Redux/user/user.actions';
import { userProfileDataType } from '../dataTypes';
interface editmodalProps{
    data:userProfileDataType;
    closeModal:()=>void
}
const EditProfileModal = (props:editmodalProps) => {
    const{data,closeModal} = props;
    const dispatch:Dispatch<any> = useDispatch()
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const [update,setUpdate] = useState<any>(data);
    useEffect(()=>{
        window.document.body.style.overflow='hidden'
        return ()=>{
            window.document.body.style.overflow='auto'
        }
    },[])
    const handleChange = (e: { target: { name: string; value: string; }; })=>{
        setUpdate({...update,[e.target.name]:e.target.value})
    }

    const handleUserDetailsUpdate:React.FormEventHandler<HTMLFormElement> =(e)=>{
      e.preventDefault()
        dispatch(updateUser(update))
        closeModal()
    }

  return (
    <div className='z-50 fixed flex justify-center items-center bg-black/50 top-0 bottom-0 left-0 right-0'>
        <div className={`${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"} md:w-[50%] overflow-hidden shadow-xl rounded-2xl animate-in zoom-in-50 ease-in-out duration-500`}>
          <div className={`h-14 flex items-center px-4 bg-bg_sec ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`}>
            <BsArrowLeft onClick={()=>closeModal()} className='cursor-pointer text-2xl mx-4 text-third_color font-bold' />
            <h3>Your Details</h3>
          </div>
          <form onSubmit={handleUserDetailsUpdate} className='flex flex-col md:p-10 p-4'>
          <label className='my-2'>Name</label>
          <div className='w-full flex justify-between'>
          <input required className={`w-1/2 bg-bg_sec outline-none p-2 rounded-md ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`} name='first_name' id="first_name" value={update.first_name} onChange={handleChange} type="text" placeholder='First Name'/>

          <input className={`w-1/2 ml-10 bg-bg_sec outline-none p-2 rounded-md ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`} name='last_name' id="last_name" value={update.last_name} onChange={handleChange} type="text" placeholder='Last name'/>
          </div>
          <label  htmlFor="room_about" className='my-2'>Bio</label>
          <textarea name="bio" value={update.bio} onChange={handleChange} className={`${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}outline-none p-2 rounded-md resize-none`} placeholder='Some words about You..'id="room_about" cols={20}  rows={4}></textarea>

            <label className='my-2'>Instagram</label>
          <input className={`bg-bg_sec outline-none p-2 rounded-md ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`} name="insta_url" value={update.insta_url} onChange={handleChange} type="text" placeholder='url'/>

            <label className='my-2'>Linkedin</label>
          <input className={`bg-bg_sec outline-none p-2 rounded-md ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`} name="linkedin_url" value={update.linkedin_url} onChange={handleChange} type="text" placeholder='url'/>

            <label className='my-2'>Twitter</label>
          <input className={`bg-bg_sec outline-none p-2 rounded-md ${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"}`} name="twitter_url" value={update.twitter_url} onChange={handleChange} type="text" placeholder='url'/>

          <div className='mt-4 flex flex-row-reverse items-center'>
          <input type="submit" className='py-2 px-4 rounded-md text-right w-fit mx-4 bg-third_color font-semibold text-bg_pri cursor-pointer text-white'value={"Save Changes"}/>
            <button onClick={()=>closeModal()} className='bg-bg_sec py-2 px-4 rounded-md' >Cancel</button>
          </div>
        </form>
    </div>
    </div>
  )
}

export default EditProfileModal;