import { useParams } from "react-router-dom";
import BrowseTopics from "../Components/BrowseTopics";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { Dispatch } from "redux";
import { getRoombyId } from "../Redux/room/room.action";
import UpdateRoomModal from "../Components/UpdateRoomModal";
const UpdateRoom = () => {
    const {id}=useParams();
    const dispatch:Dispatch<any> = useDispatch()
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