import Topics from './Topics'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { CiSearch } from 'react-icons/ci'
import { Dispatch, useEffect, useState } from 'react'
import { getTopics } from '../Redux/topic/topic.actions'

const BrowseTopics = () => {
  const { allTopics } = useSelector((val: rootReducertype) => val.topics)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  const [more,setMore] = useState(false);
  const [topics, setTopics] = useState([])
  const dispatch: Dispatch<any> = useDispatch()
  useEffect(() => {
    dispatch(getTopics())
  }, [dispatch])
  useEffect(()=>{
    if(!more){
    let tpcs = allTopics?.slice(0,6);
    setTopics(tpcs)
    }else{
      setTopics(allTopics)
    }
  },[allTopics, more])
  return (
    <div className={`w-[18%] left-[2%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl shadow-md h-[80vh] max-h-[80vh] overflow-y-auto scrollbar-hide animate-in slide-in-from-right-96 ease-in-out duration-500`}>
      <div className={`sticky top-0 w-full left-0 p-6 pb-2 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"}`}>
        <h3 className='font-bold mb-4 text-lg'>Browse Topics</h3>
        {/* search for topics  */}
        <div className={`rounded-full flex items-center py-2 ml-[-6px] my-2 ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"}`} >
          <input type="text" className={`pl-6 w-[80%] bg-bg_pri outline-none ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"}`} placeholder='Add Comment..' />
          <CiSearch className='cursor-pointer text-3xl'/>
        </div>
      </div>
      {topics?.map((el: any)=> <Topics key={el.id} data={el} />)}
      {more?<button onClick={()=>setMore(false)} className='cursor-pointer flex font-semibold items-center justify-between my-3 mx-10 hover:text-third_color '>
        <p>Less</p>
        <AiOutlineUp className='font-bold mx-2' />
      </button>:<button onClick={()=>setMore(true)} className='cursor-pointer flex font-semibold items-center justify-between my-3 mx-10 hover:text-third_color '>
        <p>More</p>
        <AiOutlineDown className='font-bold mx-2' />
      </button>}
    </div>
  )
} 

export default BrowseTopics