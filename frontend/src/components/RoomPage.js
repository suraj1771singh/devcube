import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function RoomPage(props) {
  const { id } = useParams();
  const { createMsg, deleteMsg, fetchRoomById, fetchMsgsByRoom, User } = useContext(AuthContext);
  const [roomData, setRoomData] = useState();
  const [roomMsg, setRoomMsg] = useState([]);

  const fetchData = async () => {
    const res1 = await fetchRoomById(id);
    const res2 = await fetchMsgsByRoom(id);
    setRoomData(res1);
    setRoomMsg(res2);
  };
  console.log(roomMsg);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>
        hosted by : <Link to={`/user/${roomData?.host}`}>{roomData?.hostname}</Link>
      </p>
      <p>{roomData?.name}</p>
      <p>{roomData?.description}</p>
      <div>
        <h2>Comments</h2>
        <form style={{ display: "grid", width: "fit-content", gridGap: "8px" }} onSubmit={(e) => createMsg(e, roomData?.id)}>
          <textarea type="text" name="body" placeholder="Write message..." cols={50} rows={5} />
          <button type="submit">Submit</button>
        </form>

        <div>
          <h5>Recent Comments </h5>
          <div>
            {roomMsg?.map((msg) => (
              <div key={msg?.id}>
                <p>By : {msg?.username}</p>
                <p>{msg?.body}</p>
                {User.user_id == msg.user && (
                  <button type="submit" onClick={(e) => deleteMsg(msg.id)}>
                    Delete
                  </button>
                )}
                {User.user_id == msg.user && <Link to={`msg-update/${msg.id}`}>Edit</Link>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
