import { topicDataType } from "../dataTypes"

export interface topicComponentType{
  data:topicDataType;
  handleTopic:(data:topicDataType)=>void;
  limit:boolean
}
const Topics = ({data,handleTopic,limit}:topicComponentType) => {
  return (
        <button disabled={limit} onClick={()=>handleTopic(data)} className={`flex font-semibold items-center justify-between my-3 ${limit?"":"hover:text-third_color"} mx-10`}>
            <p>{data.name}</p>
        </button>
  )
}

export default Topics