import Topics from './Topics'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '../Redux/Store'
import { CiSearch } from 'react-icons/ci'
import { Dispatch, useEffect, useState } from 'react'
import { addTopicTag } from '../Redux/topic/topic.actions'
import { topicDataType } from '../dataTypes'
import { getRoomsByTopic } from '../Redux/room/room.action'
import Error from './Error'
import BrowseTopicsSkeleton from './skeletons/BrowseTopicsSkeleton'

const BrowseTopics = ({isCreate=false}) => {
  const { allTopics,topicTags,get_topics_loading,get_topics_error,} = useSelector((val: rootReducertype) => val.topics)
  let { drk_theme } = useSelector((val: rootReducertype) => val.theme)
  const [more,setMore] = useState(false);
  const [topics, setTopics] = useState<any>([]) 
  const [limit,setLimit] = useState(false)
  const dispatch: Dispatch<any> = useDispatch()
  const [topicsrch,setTopicSrch] = useState("")
  useEffect(()=>{
    if(!isCreate){
      let topicsNums = topicTags.map((el:any)=>{
        return el.id
      })
      if(topicTags.length>0){
        dispatch(getRoomsByTopic(topicsNums))
      }
    }
  },[dispatch, isCreate, topicTags])
  
  useEffect(() => {
    if(topicTags.length<5){
      setLimit(false)
    }else{
      setLimit(true)
    }
  }, [topicTags])
  useEffect(()=>{
    if(!more){
        let tpcs = allTopics.slice(0,6);
        setTopics(tpcs)
    }else{
      setTopics(allTopics)
    }
  },[allTopics, more])

  const handleTopics = (el:topicDataType)=>{
      dispatch(addTopicTag(el))
  }
  if(get_topics_error){
    return (
     <div className={`w-[18%] left-[2%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl shadow-md h-[80vh] max-h-[80vh] overflow-y-auto scrollbar-hide animate-in slide-in-from-right-96 ease-in-out duration-500`}>
    <div className='my-10'>
    <Error text='Error while Loading Topics !'/>
      </div>
     </div> 
    )
  }
  if(get_topics_loading){
    return (<><BrowseTopicsSkeleton/> </>)
  }
  const handleKeyDown = (e:any)=>{
    if(e.key==="Enter"){
      console.log('Search for',topicsrch)
    }
  }
  return (
    <div className={`w-[18%] left-[2%] hidden md:flex flex-col ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"} fixed rounded-2xl shadow-md h-[80vh] max-h-[80vh] overflow-y-auto scrollbar-hide`}>
      <div className={`sticky top-0 w-full left-0 p-6 pb-2 ${drk_theme ? "bg-bg_dark_sec text-font_dark_pri" : "bg-bg_light_sec text-font_light_pri"}`}>
        <h3 className='font-bold mb-4 text-lg'>{(isCreate)?"Select Tags":"Browse Topics"}</h3>
        {/* search for topics  */}
        <div className={`rounded-full flex items-center py-2 ml-[-6px] my-2 ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"}`} >
          <input onKeyDown={handleKeyDown} onChange={(e)=>setTopicSrch(e.target.value)} value={topicsrch} type="search" className={`pl-6 w-[80%] ${drk_theme ? "bg-bg_dark_pri text-font_dark_pri" : "bg-bg_light_pri text-font_light_pri"} outline-none`} placeholder='Search topics..' />
          <CiSearch className='cursor-pointer text-3xl'/>
        </div>
      </div>
      {topics?.map((el: any)=> <Topics key={el.id} data={el} limit={limit} handleTopic={handleTopics} />)}
      {more?<button onClick={()=>setMore(false)} className='flex font-semibold items-center justify-between my-3 mx-8 hover:text-third_color '>
        <p className='font-semibold'>Less</p>
        <AiOutlineUp className='font-bold mx-2' />
      </button>:<button onClick={()=>setMore(true)} className='cursor-pointer flex font-semibold items-center justify-between my-3 mx-8 hover:text-third_color '>
        <p className='font-semibold'>More</p>
        <AiOutlineDown className='font-bold mx-2' />
      </button>}
    </div>
  )
} 

export default BrowseTopics;