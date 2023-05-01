import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { rootReducertype } from '../Redux/Store';
import { AiOutlineClose } from 'react-icons/ai';
import Alert from './Alert';
import { topicDataType } from '../dataTypes';
import { removeTopicTag, resetTopicTag } from '../Redux/topic/topic.actions';
import { useNavigate } from 'react-router-dom';
import { resetUpdateRoomData, updateRoom } from '../Redux/room/room.action';
import Loader from './Loader';

const UpdateRoomModal = () => {
  // Redux hooks for state management 
  const { update_success, update_error, update_loading } = useSelector((val: rootReducertype) => val?.rooms)
  const data = useSelector((val: rootReducertype) => val?.rooms?.roomData)
  const dispatch: Dispatch<any> = useDispatch()
  const { topicTags } = useSelector((val: rootReducertype) => val.topics)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  // React hoooks for state change:
  const nav = useNavigate()
  //hook to toggle alert message
  const [noTagAlert, setNotagAlert] = useState(false)
  // hook to update the tags
  const [addTags, setAddTags] = useState<topicDataType[]>([])
  // hook to handle the input data in form
  const [roomData, setRoomData] = useState(data)
  // update tags
  useEffect(() => {
    setAddTags(topicTags)
  }, [topicTags])
  useEffect(() => {
    if (update_success) {
      setTimeout(() => {
        nav("/")
      }, 2000);
    }
  }, [update_success, nav])

  useEffect(() => {
    return () => {
      dispatch(resetTopicTag())
      dispatch(resetUpdateRoomData())
    }
  }, [dispatch])
  // functions for various events:
  // changing input for controlled components
  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value })
  }
  // on Create Room Button click
  const handleRoomData = (e: FormEvent) => {
    e.preventDefault();
    if (addTags.length === 0) {
      setNotagAlert(true)
    } else {
      let tags = addTags.map((el: topicDataType) => {
        return el.id
      })
      if (roomData?.name?.trim() && roomData.description.trim()) {
        let data = { ...roomData, topic: tags }
        dispatch(updateRoom(data))
      }
    }
  }
  // on Cancel button click
  const handleClose = () => {
    setRoomData({ name: "", description: "" })
    nav("/")
  }
  // alert message auto disappear (auto invoked function)
  const closeAlert = () => {
    setNotagAlert(false)
  }
  // remove added tags while creating room
  const handleRemoveTag = (el: topicDataType) => {
    dispatch(removeTopicTag(el))
  }

  return (
    <>
      <div className={`md:w-[80%] ml-[19.3%] p-10 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl`}>
        <form onSubmit={handleRoomData} className='flex flex-col'>
          {update_loading ? <Loader text='Updating Your Room..' /> : <input required className={`bg-bg_sec p-2 text-lg rounded-md ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} py-4 border-2 border-fade_font mb-2`} name='name' id="name" value={roomData?.name} onChange={handleChange} type="text" placeholder='Room Title' />}

          <textarea required name="description" value={roomData?.description} onChange={handleChange} className={`${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} outline-none p-4 rounded-md resize-none my-4 border-fade_font border-2 `} placeholder='About Your Room' id="room_about" cols={20} rows={16}></textarea>

          <div className='border-2 border-fade_font p-3 my-2 rounded-xl flex items-center '>
            <div className='text-fade_font flex items-center mr-3'>
              <p className='py-2 mx-2'> Tags </p>
              <p> {addTags.length}/5 </p>
            </div>
            <div className='flex'>
              {(addTags.length === 0) ? <p className="text-fade_font mx-2">Select Tags From Menu at left (min:1 max:5) </p> : addTags?.map((el: topicDataType, id: number) => <p key={id} className='border-2 px-4 py-2 mx-2 flex items-center rounded-full'>{el.name} <span><AiOutlineClose onClick={() => handleRemoveTag(el)} className='ml-2 cursor-pointer' /> </span> </p>)}
            </div>
          </div>

          <div className='my-4 flex flex-row-reverse items-center'>
            <input type="submit" className='py-2 px-4 rounded-md text-right w-fit text-white mx-4 bg-third_color font-semibold text-bg_pri cursor-pointer' value={"Update"} />
            <button onClick={handleClose} className='bg-red-400 text-white py-2 px-4 rounded-md '>Cancel</button>
          </div>

        </form>
      </div>
      {noTagAlert && <Alert text='Please Select Atleast 1 tag' type="error" closeAlert={closeAlert} />}
      {update_success && <Alert text='Room Updates Successfully...' type="success" closeAlert={closeAlert} />}
      {update_error && <Alert text='Error While Updating Room !' type="error" closeAlert={closeAlert} />}

    </>
  )
}

export default UpdateRoomModal