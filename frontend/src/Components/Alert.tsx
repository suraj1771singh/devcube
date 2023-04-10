import React, { useEffect,useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
interface alertTypes{
    text:string,
    type?:string;
    time?:number;
    closeAlert?:()=>void
}
const Alert = (props:alertTypes) => {
    const {text,type,time=3000,closeAlert=()=>{}} = props;
    const [alert,setAlert] = useState(true)
    useEffect(() => {
      setTimeout(() => {
        setAlert(false)
        closeAlert()
      }, time);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleCloseAlert = ()=>{
      setAlert(false)
      closeAlert()
    }
  return (
    <>
   {alert&&<div className={`w-full fixed text-center top-20 bottom-[90%] z-50 flex items-center z-index-50`}>
    <div className={`animate-in slide-in-from-top duration-500 mx-auto ${(type==='error')?"bg-red-500":(type==="info")?"bg-blue-600":(type==='success')?"bg-green-400":""} rounded-md py-2 px-4 flex items-center text-white `}>
        <h5 className=''>{text}</h5>
        <AiOutlineCloseCircle className='text-2xl ml-4 cursor-pointer' onClick={handleCloseAlert} />
    </div>
    </div>}
    </>
  )
}
export default Alert