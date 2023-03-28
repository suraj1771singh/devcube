import React, { useEffect,useState } from 'react'
interface alertTypes{
    text:string,
    type:string;
    time?:number;
}
const Alert = (props:alertTypes) => {
    const {text,type,time=30000} = props;
    console.log('alert opened')
    const [alert,setAlert] = useState(true)
    useEffect(() => {
      setTimeout(() => {
        setAlert(false)
      }, time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
   {alert&&<div onClick={()=>setAlert(false)} className={`fixed bottom-0 top-[90%] left-1 right-1 z-30 flex items-center z-index-50`}>
    <div className={`bg-${type} rounded-md py-2 px-10`}>
        <h5 className='text-white font-semibold'>{text}</h5>
    </div>
    </div>}
    </>
  )
}

export default Alert