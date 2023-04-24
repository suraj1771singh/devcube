import { useNavigate, useParams } from "react-router-dom";
import BrowseTopics from "../Components/BrowseTopics";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Dispatch } from "redux";
import { getRoombyId } from "../Redux/room/room.action";
import UpdateRoomModal from "../Components/UpdateRoomModal";
import { rootReducertype } from "../Redux/Store";
const UpdateRoom = () => {
    const {id}=useParams();
    const {update_success} = useSelector((val:rootReducertype)=>val?.rooms)
    const dispatch:Dispatch<any> = useDispatch()
    const nav = useNavigate()
    useEffect(()=>{
      if(update_success){
        nav(`/room/${id}`)
        window.location.reload()
      }
    },[update_success,id,nav])
    useEffect(() => {
        if(id){
            dispatch(getRoombyId(id))
        }
    }, [id,dispatch])
  return (
    <div className="w-11/12 m-auto flex flex-col md:flex-row justify-between">
      <BrowseTopics isCreate={true}/>
        <UpdateRoomModal />
    </div>
  );
};

export default UpdateRoom