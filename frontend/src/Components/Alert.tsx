import React, { useEffect,useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { rootReducertype } from '../Redux/Store';
interface alertTypes{
    text:string,
    type?:string;
    time?:number;
}
const Alert = (props:alertTypes) => {
    const {text,type,time=3000} = props;
    const [alert,setAlert] = useState(true)
  let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)

    useEffect(() => {
      setTimeout(() => {
        setAlert(false)
      }, time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
   {alert&&<div className={`w-full fixed text-center top-20 bottom-[90%] z-50 flex items-center z-index-50`}>
    <div className={`animate-in slide-in-from-top duration-500 mx-auto ${(type==='error')?"bg-red-400":(type==="info")?"bg-blue-600":(type==='success')?"bg-green-400":""} rounded-md py-2 px-4 flex items-center ${drk_theme?"text-font_dark_sec":"text-font_light_sec"} `}>
        <h5 className=''>{text}</h5>
        <AiOutlineCloseCircle className='text-2xl ml-4 cursor-pointer' onClick={()=>setAlert(false)} />
    </div>
    </div>}
    </>
  )
}
export default Alert