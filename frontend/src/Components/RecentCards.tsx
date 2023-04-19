import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { CalcTime } from './time'

const RecentCards = ({data}:any) => {
    let dynamicTime = new Date(data?.created).getTime()
    let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
    let reply = data.body.split(' ');
    let comment=''
    for(let i=0;i<20;i++){
        if(reply[i]){
            comment+=reply[i]+" "
        }
    }
  return (
    <div className={`rounded-2xl p-4 ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}  >
        <div className='flex items-center ' >
            <div className='w-[100px]'>
                <img src={data?.user?.photo} className='h-[60px] w-[60px] rounded-full' alt="dp" />
            </div> 
            <div className='mx-2 w-5/6'>
                <p className='font-bold hover:text-third_color cursor-pointer w-fit'>{data?.user.email}</p>
                <p className={`${drk_theme?"text-font_dark_sec":"text-font_light_sec"} text-sm font-semibold`}>{CalcTime(dynamicTime)}</p>
                <p className={`${drk_theme?"text-font_dark_sec":"text-font_light_sec"} text-sm font-semibold`} >replied in: <span className={`font-bold`}>{data?.room?.name}</span> </p>
            </div>
        </div>
        <div className={`${drk_theme?"bg-bg_dark_sec text-font_dark_pri":"bg-bg_light_sec text-font_light_pri"} text-sm font-semibold rounded-2xl p-2 mt-2`}>
            <p>{comment}...</p>
        </div>
    </div>
  )
}

export default RecentCards