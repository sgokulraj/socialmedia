import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../ReduxState/index.js";
import "../Stylesheet/Friends.css";
import { MdOutlinePersonRemove } from "react-icons/md";
import { GoPersonAdd } from "react-icons/go";

function Friends({ friendId, name, subtitle, userPicturePath }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);
  const token = useSelector((state) => state.token);
  let isFriend;
  if (friends.length) {
    isFriend = friends.find((friend) => friend._id === friendId);
  }

  const addRemoveFriend = async () => {
    const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <main className="friendsContainer">
      <div className="friendsContainer" style={{ gap: "1rem" }}>
        <div className="frndImgContainer">
          <img
            src={userPicturePath}
            alt="friend"
          />
        </div>
        <div
          // onClick={() => {
          //   navigate(`/profile/${friendId}`);
          //   navigate(0);
          // }}
          className="friendsInfo"
        >
          <h5>{name}</h5>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="addFrndContainer" onClick={() => addRemoveFriend()}>
        {(friendId !== _id) && (isFriend ? (
          <MdOutlinePersonRemove className="frndIcon" />
        ) : (
          <GoPersonAdd className="frndIcon" />
        ))}
      </div>
    </main>
  );
}

export default Friends;
