import React from 'react'
import { useSelector } from 'react-redux'
import { rootReducertype } from '../../Redux/Store'
import RoomsCardSkl from './RoomsCardSkl'

const AllRoomsSkl = () => {
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    let rooms = [1,2,3]
  return (
    <div className='md:w-[54%] ml-[19.3%]'>
                    <div className={`flex items-center justify-between`} >
                        <div className={`${drk_theme ? "bg-bg_dark_sec_skl" : "bg-bg_light_sec_skl"} py-3 px-4 rounded-xl w-[300px] h-20 animate-pulse`}>
                        </div>
                        <div className={`${drk_theme ? "bg-bg_dark_sec_skl" : "bg-bg_light_sec_skl"} py-3 px-4 rounded-xl w-[300px] h-20 animate-pulse`}>
                        </div>
                    </div>
                    <div className='ease-in-out duration-500 animate-in slide-in-from-bottom-48 '>
                    {rooms.map((el: any,id:number) => <RoomsCardSkl key={id}/>)}
                    </div>
                </div>
  )
}

export default AllRoomsSkl