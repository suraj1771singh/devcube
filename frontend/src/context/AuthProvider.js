import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
  const navigate = useNavigate();
  //using callback function so that it will check for local storage only once
  const [authTokens, setAuthTokens] = useState(() => (localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null));
  const [user, setUser] = useState(() => (authTokens != null ? jwt_decode(authTokens?.access) : null));
  const [loading, setLoading] = useState(true);

  const [rooms, setRooms] = useState();
  const [topics, setTopics] = useState();

  //-----------------USER
  const registerUser = async (e) => {
    e.preventDefault();
    let data = {
      first_name: e.target.first_name.value,
      email: e.target.email.value,
      password1: e.target.password1.value,
      password2: e.target.password2.value,
    };
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        ...data,
      });
      data = response.data;
      console.log(data.msg);
      navigate("/login");
    } catch (e) {
      console.log("Something went wrong");
    }
  };
  //depricated
  const getUsernameById = async (userId) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/username/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      const data = response.data;
      console.log(data);
    } catch (e) {
      console.log("Something went wrong !");
    }
  };

  const getUserProfile = async (userId) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/user/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      const data = response.data;
      return data;
    } catch (e) {
      console.log("Something went wrong !");
      return null;
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        email: e.target.email.value,
        password: e.target.password.value,
      });
      const data = response.data;
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.log("Something went wrong-----\n", err);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const updateToken = async () => {
    console.log("Update token called");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: authTokens.refresh,
      });
      const data = response.data;
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } catch (err) {
      // logoutUser();
      console.log("Session Expired, Login again");
    }
    if (loading) setLoading(false);
  };

  //----------------ROOM
  const createRoom = async (e) => {
    e.preventDefault();
    const data = {
      topic: e.target.topic.value,
      name: e.target.roomname.value,
      description: e.target.description.value,
    };
    try {
      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/createroom/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        data: data,
      });
      if (response.status === 200) {
        console.log(response.data.msg);
        navigate("/");
      }
    } catch (e) {
      console.log("Something went wrong !");
    }
  };

  const deleteRoom = async (id) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://127.0.0.1:8000/api/room-delete/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      console.log(response?.data);
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const updateRoom = async (e, roomdata, id) => {
    e.preventDefault();
    console.log(roomdata, id);
    try {
      const response = await axios({
        method: "PATCH",
        url: `http://127.0.0.1:8000/api/room-update/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        data: roomdata,
      });
      console.log(response?.data);
    } catch (e) {
      console.log("Something went wrong !");
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/rooms/",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      const data = response.data;
      setRooms(data);
      console.log("data", data);
    } catch (e) {
      console.log("Something went wrong !");
    }
  };

  const fetchRoomsByUser = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/rooms-user/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      const data = response.data;
      return data;
    } catch (e) {
      console.log("Something went wrong !");
      return null;
    }
  };

  const fetchRoomById = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/room/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      const data = response.data;
      return data;
    } catch (e) {
      console.log("Something went wrong !");
      return null;
    }
  };

  const addParticipant = async (id) => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `http://127.0.0.1:8000/api/room-add-participant/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      console.log(response.data?.msg);
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const removeParticipant = async (id) => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `http://127.0.0.1:8000/api/room-remove-participant/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      console.log(response.data?.msg);
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const getRoomsJoinedByUser = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/rooms-joined/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      return response?.data;
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  //-------------------FOLLOWERS AND FOLLOWING
  const follow = async (id) => {
    try {
      const response = await axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/follow/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      console.log(response.data?.msg);
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const unfollow = async (id) => {
    try {
      const response = await axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/unfollow/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      console.log(response.data?.msg);
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const fetchFollowers = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/followers/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      return response?.data;
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const fetchFollowing = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/following/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      return response?.data;
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  //-------------------TOPICS
  const fetchTopics = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/topics/",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      setTopics(data);
      console.log(data);
    } catch (e) {
      console.log("Something went wrong !");
    }
  };

  //------------------MESSAGES
  const createMsg = async (e, roomId) => {
    const data = {
      body: e.target.body.value,
    };
    try {
      const response = await axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/createMsg/${roomId}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        data: { ...data },
      });
      if (response.status === 200) {
        console.log(response.data?.msg);
        // navigate("/");
      }
    } catch (e) {
      console.log("Something went wrong !");
    }
  };

  const deleteMsg = async (id) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://127.0.0.1:8000/api/msg-delete/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      console.log(response.data?.msg);
    } catch (e) {
      console.log("Something went wrong !");
    }
  };

  const updateMsg = async (e, id) => {
    const data = {
      body: e.target.body.value,
    };
    try {
      const response = await axios({
        method: "PATCH",
        url: `http://127.0.0.1:8000/api/msg-update/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        data: { ...data },
      });
      console.log(response.data?.msg);
    } catch (e) {
      console.log("Something went wrong !");
    }
  };

  const fetchMsgsByRoom = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/msgs-room/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      return response?.data;
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 4 * 60 * 1000);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  // useEffect(() => {
  //   fetchRooms();
  // });
  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        updateToken,
        getUserProfile,
        getUsernameById,
        User: user,

        createRoom,
        deleteRoom,
        updateRoom,
        fetchRooms,
        fetchRoomsByUser,
        fetchRoomById,
        addParticipant,
        removeParticipant,
        getRoomsJoinedByUser,
        rooms,

        follow,
        unfollow,
        fetchFollowers,
        fetchFollowing,

        fetchTopics,
        topics,

        createMsg,
        deleteMsg,
        updateMsg,
        fetchMsgsByRoom,
      }}
    >
      {loading ? null : props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
