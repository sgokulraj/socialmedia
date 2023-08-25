import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../ReduxState/index.js";
import Friends from "./Friends";
import "../Stylesheet/Friendslist.css";

function Friendslist({ userId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getUserFriends = async () => {
    const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const userFriends = await res.json();
    dispatch(setFriends({ friends: userFriends }));
  };

  useEffect(() => {
    getUserFriends();
  }, []);

  return (
    <main className="friendlistContainer">
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h5>Friends</h5>
        <p>{`${friends.length}`}</p>
      </div>
      <div className="frndList">
        {friends.length ? (friends.map((friend) => (
          <Friends
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.location}
            userPicturePath={friend.picturePath}
          />
        ))) : ('')}
      </div>
    </main>
  );
}

export default Friendslist;
