import BrowseTopics from "../Components/BrowseTopics";
import CreateRoomModal from "../Components/CreateRoomModal";
const CreateRoom = () => {
  return (
    <div className="w-11/12 m-auto flex flex-col md:flex-row justify-between">
      <BrowseTopics isCreate={true}/>
        <CreateRoomModal/>
    </div>
  );
};

export default CreateRoom;
