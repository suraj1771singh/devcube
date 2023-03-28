import { useSelector } from 'react-redux'
import Login from '../page/Login'
import { rootReducertype } from '../Redux/Store'

const PrivateRoutes = ({children}:any) => {
   const {isAuth} =  useSelector((val:rootReducertype)=>val.auth)
  if(isAuth){
    return children
  }else{
    return <Login/>
  }
   
}

export default PrivateRoutes