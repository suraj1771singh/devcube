import React from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'

const Participants = ({data}:any) => {

    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)

  let ParticipantsArr = [1,2,3,4,4,5,4,34,3,3]
  return (
    <div className={`w-[18%] right-[2%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl py-8 px-10 shadow-md h-[80vh] max-h-[80vh] overflow-y-auto scrollbar-hide animate-in slide-in-from-left-96 ease-in-out duration-500`}>
      <div className='mb-5'>
    <h3 className='font-bold'>PARTICIPANTS</h3>
      <h4 className='text-xs pt-2 font-semibold'>10 joined</h4>
      </div>
    <div className='grid grid-col-1 gap-3' >
      {/* Map the below div : it is Participants of the perticular room */}
      {
        ParticipantsArr.map((el,id)=><div key={id} className='flex items-center justify-between border-2 py-2'>
      <div>
        <img src="/profile.svg" alt="" className='w-[40px]' />
      </div>
      <div className='w-2/3 text-sm font-semibold'>
        <h2>Name Singh</h2>
      </div>
    </div>)}
    </div>
</div>
  )
}

export default Participants