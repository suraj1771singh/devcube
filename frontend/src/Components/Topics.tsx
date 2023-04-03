import React from 'react'

const Topics = ({data}:any) => {
  return (
        <button className='flex font-semibold items-center justify-between my-3 hover:text-third_color cursor-pointer mx-10'>
            <p>{data.name}</p>
        </button>
  )
}

export default Topics