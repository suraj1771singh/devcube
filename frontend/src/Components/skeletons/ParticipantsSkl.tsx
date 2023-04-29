import React from 'react'
import { rootReducertype } from '../../Redux/Store'
import { useSelector } from 'react-redux'

const ParticipantsSkl = () => {
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    let part = [1, 2, 3, 4, 5, 6]
    return (
        <div className={`w-[25%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl shadow-md right-[2%] overflow-y-auto h-[80vh] max-h-[80vh] scrollbar-hide animate-in slide-in-from-left-96 ease-in-out duration-500`}>
            <div className='m-10'>
                {part.map((el: number) => <div key={el} className={`flex items-center my-5`}>
                    <p className={`w-[60px] h-[60px] rounded-full mr-4 ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"}`}></p>
                    <h3 className={`mx-2 font-semibold animate-pulse ${drk_theme ? "bg-bg_dark_pri_skl" : "bg-bg_light_pri_skl"} w-5/6 rounded-xl h-10`}> </h3>
                </div>)}
            </div>
        </div>
    )
}

export default ParticipantsSkl 