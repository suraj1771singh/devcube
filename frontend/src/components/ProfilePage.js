import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function ProfilePage(props) {
  const { id } = useParams();
  const { getUserProfile, fetchRoomsByUser, deleteRoom, User, getRoomsJoinedByUser, follow, fetchFollowers, fetchFollowing } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const getUserDetails = async () => {
    const response1 = await getUserProfile(id);
    const response2 = await fetchRoomsByUser(id);
    const response3 = await getRoomsJoinedByUser(id);
    const response4 = await fetchFollowers(id);
    const response5 = await fetchFollowing(id);
    const data = {
      ...response1,
      rooms: response2,
    };
    setUserData(data);
    setJoinedRooms(response3);
    setFollowers(response4);
    setFollowing(response5);
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      {User?.user_id !== id ? <button onClick={() => follow(id)}>Follow</button> : null}
      <div style={{ display: "grid", gridDirection: "columne" }}>
        <span> Followers : {followers?.length}</span>
        <span>Following : {following?.length}</span>
      </div>
      <h3>Rooms hosted by {userData?.first_name + " " + userData?.last_name}</h3>
      <div>
        {userData?.rooms?.map((room) => (
          <div key={room.id}>
            {/* <p>{room?.topic?.name}</p> */}

            <p>{room?.name}</p>
            <p>{room?.description}</p>

            {User.user_id === room.host && <button onClick={() => deleteRoom(room.id)}>Delete</button>}
            {User.user_id === room.host && (
              <Link to={`/room-update/${room.id}/`} state={{ data: room }}>
                {" "}
                Edit
              </Link>
            )}
            <hr />
          </div>
        ))}
      </div>
      <h3>Rooms joined </h3>
      <div>
        {joinedRooms?.map((room) => (
          <div key={room?.id}>
            <Link>{room?.hostname}</Link>
            <p>{room?.name}</p>
            <p>{room?.description}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
