import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";

function CreateRoom(props) {
  const { topics, createRoom, updateRoom } = useContext(AuthContext);
  const location = useLocation();
  const data = location.state?.data;

  const [roomData, setRoomData] = useState(data || { name: "", topic: "", description: "" });
  console.log(roomData);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "30%", margin: "auto", alignItems: "center" }}>
      {data ? <h2>Update Room</h2> : <h2>Create Room </h2>}
      <form style={{ display: "grid", gridGap: "8px", width: "100%", margin: "1rem" }} onSubmit={data ? (e) => updateRoom(e, roomData, roomData.id) : createRoom}>
        <input
          type="text"
          name="roomname"
          placeholder="Room Name"
          value={roomData?.name}
          onChange={(e) => {
            setRoomData({ ...roomData, name: e.target.value });
          }}
        />
        <div>
          <label>Topic : </label>
          <select
            name="topic"
            value={roomData?.topic}
            onChange={(e) => {
              setRoomData({ ...roomData, topic: e.target.value });
            }}
          >
            {topics?.map((topic, ind) => (
              <option key={ind} value={topic.id}>
                {topic?.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          rows={5}
          type="text"
          name="description"
          placeholder="write about something room...."
          value={roomData?.description}
          onChange={(e) => {
            setRoomData({ ...roomData, description: e.target.value });
          }}
        />
        {data ? <button type="submit">Update Room</button> : <button type="submit">Create Room</button>}
      </form>
    </div>
  );
}

export default CreateRoom;
