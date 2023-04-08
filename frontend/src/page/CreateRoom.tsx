import React,{useState} from "react";
import BrowseTopics from "../Components/BrowseTopics";
import CreateRoomModal from "../Components/CreateRoomModal";
const CreateRoom = () => {
  const [tags,setTags ] = useState(["demo"])
  const getTags = (el:string)=>{
    let exists = tags.indexOf(el)
    if(exists===-1){
      setTags([...tags,el])
    }else{
      
    }
  }
  const removeTag = (e:string)=>{
    // eslint-disable-next-line array-callback-return
    let updatedTags= tags.filter((el:string)=>{
      if(el!==e){
        return el
      }
    })
    setTags(updatedTags)
  }
  return (
    <div className="w-11/12 m-auto flex flex-col md:flex-row justify-between">
      <BrowseTopics isCreate={true} getTags={getTags} />
        <CreateRoomModal tags={tags.slice(1)} removeTag={removeTag} />
    </div>
  );
};

export default CreateRoom;
