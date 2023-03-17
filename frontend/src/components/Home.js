import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { fetchRooms, fetchTopics, rooms, addParticipant, removeParticipant, User } = useContext(AuthContext);
  return (
    <div style={{ display: "grid", flexDirection: "column", width: "fit-content", gridGap: "1rem", margin: "auto" }}>
      This is home page
      <button onClick={fetchRooms}>Fetch rooms</button>
      <button onClick={fetchTopics}>Fetch Topics</button>
      <Link to={"/create-room"}>Create Room</Link>
      <div>
        {rooms?.map((room) => (
          <div style={{ borderBottom: "2px" }} key={room.id}>
            <Link to={`/user/${room.host}`}>{room?.hostname}</Link>
            <p>
              <Link to={`/room/${room.id}/`}> {room?.name}</Link>
            </p>
            <p>{room?.description}</p>
            <p>Joined : {room?.participants.length}</p>
            {User?.user_id !== room?.host ? !room?.participants.some((id) => User?.user_id === id) ? <button onClick={() => addParticipant(room?.id)}>Join</button> : <button onClick={() => removeParticipant(room?.id)}>Leave</button> : null}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
