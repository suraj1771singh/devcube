import React, { useEffect,useState } from 'react'
interface alertTypes{
    text:string,
    type:string;
    time?:number;
}
const Alert = (props:alertTypes) => {
    const {text,type,time=30000} = props;
    const [alert,setAlert] = useState(true)
    useEffect(() => {
      setTimeout(() => {
        setAlert(false)
      }, time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
   {alert&&<div onClick={()=>setAlert(false)} className={`fixed bottom-0 top-[90%] left-1 right-1 z-30 flex items-center `}>
    <div className={`bg-${type}-400 rounded-md py-2 px-10`}>
        <h5 className='text-black font-semibold'>{text}</h5>
    </div>
    </div>}
    </>
  )
}

export default Alert