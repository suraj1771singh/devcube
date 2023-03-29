import React from 'react'

const Topics = ({data}:any) => {
  return (
        <div className='flex font-semibold items-center justify-between my-3 hover:text-third_color cursor-pointer ml-2'>
            <p>{data.name}</p>
        </div>
  )
}

export default Topics