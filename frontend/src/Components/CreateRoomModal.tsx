import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createRoom, resetCreateRoomData } from '../Redux/room/room.action';
import { rootReducertype } from '../Redux/Store';
import Alert from './Alert';
import { topicDataType } from '../dataTypes';
import { useNavigate } from 'react-router-dom';
import TagsDiv from './TagsDiv';
import { resetTopicTag } from '../Redux/topic/topic.actions';
import Loader from './Loader';

const CreateRoomModal = () => {
  // Redux hooks for state management 
  const dispatch: Dispatch<any> = useDispatch()
  const { topicTags } = useSelector((val: rootReducertype) => val.topics)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  let { create_loading, create_error, create_success } = useSelector((val: rootReducertype) => val.rooms)
  // React hoooks for state change:
  const nav = useNavigate()
  //hook to toggle alert message
  const [noTagAlert, setNotagAlert] = useState(false)
  // hook to update the tags
  const [addTags, setAddTags] = useState<topicDataType[]>([])
  // hook to handle the input data in form
  const [roomData, setRoomData] = useState({ name: "", description: "" })
  // update tags
  useEffect(() => {
    if (create_success) {
      setTimeout(() => {
        nav("/")
      }, 2000);
    }
  }, [create_success, nav])
  useEffect(() => {
    setAddTags(topicTags)
  }, [topicTags])

  useEffect(() => {
    return () => {
      dispatch(resetTopicTag())
      dispatch(resetCreateRoomData())
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
      if (roomData.name.trim() && roomData.description.trim()) {
        let data = { ...roomData, topic: tags }
        dispatch(createRoom(data))
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
  return (
    <>
      <div className={`md:w-[80%] ml-[19.3%] p-10 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} rounded-2xl animate-in slide-in-from-bottom-96 ease-in-out duration-500`}>
        <form onSubmit={handleRoomData} className='flex flex-col'>
          {create_loading ? <Loader text='Creating Room For you..' /> : <input required className={`bg-bg_sec p-2 text-lg rounded-md ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} py-4 border-2 border-fade_font mb-2`} name='name' id="name" value={roomData.name} onChange={handleChange} type="text" placeholder='Room Title' />}

          <textarea required name="description" value={roomData.description} onChange={handleChange} className={`${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} outline-none p-4 rounded-md resize-none my-4 border-fade_font border-2 `} placeholder='About Your Room' id="room_about" cols={20} rows={16}></textarea>
          {/* to show all the tags present  */}
          <div className='border-2 border-fade_font p-3 my-2 rounded-xl flex items-center '>
            <TagsDiv isCreate={true} />
          </div>
          <div className='mt-4 flex flex-row-reverse items-center'>
            <input type="submit" className={`py-2 px-4 rounded-md text-right w-fit text-white mx-4 bg-third_color font-semibold text-bg_pri cursor-pointer ${create_loading && "bg-third_color/20"}`} disabled={create_loading} value={`${create_loading ? "Creating Room.." : "Create Room"}`} />
            <button onClick={handleClose} className='bg-red-400 text-white py-2 px-4 rounded-md '>Cancel</button>
          </div>
        </form>
      </div>
      {noTagAlert && <Alert text='Please Select Atleast 1 tag' type="error" closeAlert={closeAlert} />}
      {create_error && <Alert text='Error While Creating Room !' type="error" closeAlert={closeAlert} />}
      {create_success && <Alert text='Room Created Successfully...' type="success" closeAlert={closeAlert} />}
    </>
  )
}

export default CreateRoomModal