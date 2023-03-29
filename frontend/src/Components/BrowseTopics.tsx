import Topics from './Topics'
import { AiOutlineDown } from "react-icons/ai"
import { useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { CiSearch } from 'react-icons/ci'

const BrowseTopics = () => {
    const { allTopics } = useSelector((val: rootReducertype) => val.topics)
    let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
    const handleMoreRooms = () => {
        // alltopics  will be shown in a modal 
    }
  return (
    <div className={`w-[18%] left-[2%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed top-[14%] rounded-2xl py-8 px-10 shadow-md h-[80vh] max-h-[80vh] overflow-y-auto scrollbar-hide animate-in slide-in-from-right-96 ease-in-out duration-500`}>
    <h3 className='font-bold mb-4'>BROWSE TOPICS</h3>
    {/* search for topics  */}

    <div className={`rounded-full flex items-center py-2 ml-[-6px] my-2 ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`} >
   <CiSearch className='cursor-pointer mx-2 font-bold' />
        <input type="text" placeholder='Search topics' className={`w-5/6 outline-none pl-2 ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri"}`}/>
    </div>
    {allTopics.slice(0,5)?.map((el: any) => <Topics key={el.id} data={el} />)}
    <div onClick={handleMoreRooms} className='cursor-pointer flex font-semibold items-center justify-between my-3 mx-2 hover:text-third_color '>
        <p>More</p>
        <AiOutlineDown className='font-bold mx-2' />
    </div>
</div>
  )
}

export default BrowseTopics