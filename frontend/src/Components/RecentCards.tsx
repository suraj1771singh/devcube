import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { CalcTime } from './time'

const RecentCards = () => {
    let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
  return (
    <div className={`rounded-2xl p-4 ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}  >
        <div className='flex items-center' >
            <div className='rounded-full'>
                <img src="/profile.svg" className='h-[60px] w-[60px]' alt="dp" />
            </div> 
            <div className='mx-2'>
                <p className='font-bold hover:text-third_color cursor-pointer w-fit'>@username</p>
                <p className={`${drk_theme?"text-font_dark_sec":"text-font_light_sec"} text-sm font-semibold`}>{CalcTime(Date.now())}</p>
                <p className={`${drk_theme?"text-font_dark_sec":"text-font_light_sec"} text-sm font-semibold`} >replied in: <span className={`font-bold`}>Room Name</span> </p>
            </div>
        </div>
        <div className={`${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"} text-sm font-semibold rounded-2xl p-2 mt-2`}>
            <p>hello, this is my time experience of having into metro city. I wnat to purse HM from IHA.</p>
        </div>
    </div>
  )
}

export default RecentCards