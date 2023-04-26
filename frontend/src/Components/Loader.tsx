import React from 'react'
import { PulseLoader } from 'react-spinners'

const Loader = ({text="Loading"}:{text?:string}) => {
  return (
    <div className='flex flex-col justify-center items-center rounded-full'>
    <PulseLoader color="#8001FF" />
    <h5 className='text-lg my-4'>{text}</h5>
    </div>
  )
}

export default Loader