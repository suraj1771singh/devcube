
const Topics = ({data,handleTopic}:any) => {
  
  return (
        <button onClick={()=>handleTopic(data)} className='flex font-semibold items-center justify-between my-3 hover:text-third_color cursor-pointer mx-10'>
            <p  >{data.name}</p>
        </button>
  )
}

export default Topics