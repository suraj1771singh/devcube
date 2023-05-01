import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { CalcTime } from './time'
import { useNavigate } from 'react-router-dom'
import { commentDataDataType} from '../dataTypes'

interface propsType{
    data:commentDataDataType
}
const RecentCards = ({data}:propsType) => {
    let dynamicTime = new Date(data?.created).getTime()
    const nav = useNavigate()
    let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
    let reply = data.body.split(' ');
    let comment=''
    for(let i=0;i<=20;i++){
        if(reply[i]){
            comment+=reply[i]+" "
        }
    }
    const handleUserProfile=(id:number)=>{
        nav(`/profile/${id}`)
    }
    const handleGotoRoom=(id:number)=>{
        nav(`/room/${id}`)
    }
  return (
    <div className={`rounded-2xl my-4 p-4 ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}  >
        <div className='flex items-center ' >
            <div className='w-[80px]'>
                <img src={data?.user?.photo} className='h-[60px] w-[60px] rounded-full' alt="dp" />
            </div> 
            <div className='mx-2 w-5/6'>
                <p className='font-bold text-sm hover:text-third_color cursor-pointer w-fit' onClick={()=>handleUserProfile(data?.user?.id)}>{data?.user.email}</p>
                <p className={`text-fade_font text-sm font-semibold`}>{CalcTime(dynamicTime)}</p>
                <p onClick={()=>handleGotoRoom(data?.room?.id)} className={`text-sm  cursor-pointer`} >replied in: <span className={`${drk_theme ? "text-font_dark_sec":"text-font_light_sec"} text-sm  font-bold`}>{data?.room?.name}</span> </p>
            </div>
        </div>
        <div className={`${drk_theme?"bg-bg_dark_sec  text-font_dark_sec":"bg-bg_light_sec text-font_light_pri"} text-sm font-semibold rounded-2xl p-2 mt-2`}>
            <p className={`${drk_theme && "font-light"}`}>{comment} {(comment.split(' ').length>18)&&" ..."}</p>
        </div>
    </div>
  )
}

export default RecentCards