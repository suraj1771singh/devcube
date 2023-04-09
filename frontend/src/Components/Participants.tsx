import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { NavLink } from 'react-router-dom'

const Participants = ({data}:any) => {
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  return (
    <div className={`w-[18%] right-[2%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl shadow-md h-[80vh] max-h-[80vh] overflow-y-auto scrollbar-hide animate-in slide-in-from-left-96 ease-in-out duration-500`}>
      <div className={`sticky top-0 w-full left-0 p-6 pb-2 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"}`}>
    <h3 className='font-bold text-lg'>Participants</h3>
      <h4 className='text-xs pt-2 font-semibold'>{data?.length} joined</h4>
      </div>
    <div className='grid grid-col-1 gap-3' >
      {/* Map the below div : it is Participants of the perticular room */}
      {
        data?.map((el:any,id:number)=><div key={id} className='flex items-center justify-between py-2  px-4'>
      <div>
        <img src="/profile.svg" alt="" className='w-[40px]' />
      </div>
      <div className='w-4/5 text-sm font-semibold'>
        <NavLink to={`/profile/${el.id}`} className='hover:text-third_color hover:shadow-md py-2 cursor-pointer'>{el.email}</NavLink>
      </div>             
    </div>)}
    </div>
</div>
  )
}

export default Participants