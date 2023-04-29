import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { NavLink } from 'react-router-dom'

const Participants = ({data}:any) => {
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  return (
    <div className={`w-[25%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl shadow-md right-[2%] overflow-y-auto h-[80vh] max-h-[80vh] scrollbar-hide`}>
      <div className={`sticky top-0 w-full left-0 p-6 pb-2 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"}`}>
    <h3 className='font-bold text-lg'>Participants ({data?.length})</h3>
      {/* <h4 className='text-xs pt-2 font-semibold'>{data?.length} joined</h4> */}
      </div>
    <div className='grid grid-col-1 gap-3' >
      {/* Map the below div : it is Participants of the perticular room */}
      {
        data?.map((el:any)=><div key={el.id} className='flex items-center justify-between py-2  px-4'>
      <div>
        <img src={el?.photo} alt="profile" className='w-[40px] rounded-full' />
      </div>
      <div className='w-4/5 text-sm font-semibold mx-3'>
        <NavLink to={`/profile/${el.id}`} className='hover:text-third_color py-2 cursor-pointer'>{el.email}</NavLink>
      </div>             
    </div>)}
    </div>
</div>
  )
}

export default Participants