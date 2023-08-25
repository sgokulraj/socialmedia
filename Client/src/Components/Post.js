import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../ReduxState/index.js";
import Friends from "./Friends.js";
import "../Stylesheet/Post.css";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiSolidSend } from "react-icons/bi";
import {BsArrowReturnRight} from "react-icons/bs"

function Post({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const userIdLogged = useSelector((state) => state.user._id);
  const firstName = useSelector((state) => state.user.firstName);
   const [cmt, setCmt] = useState("")
  const [isComments, setIsComments] = useState(false);
  let isLiked;
  let likesCount
  if (likes) {
    isLiked = Boolean(likes[userIdLogged]);
    likesCount = Object.keys(likes).length;
  }


  const likePostUpdate = async () => {
    const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/posts/${postId}/likes`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userIdLogged }),
    });
    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  };


  async function deleteMyPost(postId, userIdLogged) {
    if (window.confirm("Are you sure about it?")) {
      let res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/posts/${postId}/${userIdLogged}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      let data = await res.json()
      console.log(data)
      dispatch(setPosts({ posts: data }));
      if(res.ok){
        alert("Post Deleted successfully")
      }
    }
  }

  async function sendComment() {
    if (cmt.length > 0) {
      const comment = cmt;
      const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/posts/${postId}/${comment}/${firstName}/comments`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },

      })
      const updatedPost = await res.json();
      dispatch(setPost({ post: updatedPost }));
      setCmt("")
    } else {
      alert("Enter something to save your comment")
    }
  }

  return (
    <main className="postContainer">
      <hr />
      <Friends
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {userIdLogged === postUserId ? (
        <div style={{ float: "right", marginTop: "-40px" }}>
          <Link>
            <AiFillDelete
              className="editpostBtn"
              onClick={() => deleteMyPost(postId, userIdLogged)}
            />
          </Link>
        </div>
      ) : ("")}
      <p className="postDesc">{description}</p>
      {picturePath && (
        <img
          src={picturePath}
          alt="userimg"
          className="postedImg"
        />
      )}
      <div className="postImpressed" style={{ marginTop: "8px" }}>
        <div className="postImpressed" style={{ gap: "25px" }}>
          <div className="postImpressed" style={{ gap: "5px" }}>
            <p onClick={likePostUpdate}>
              {isLiked ? (
                <MdOutlineFavorite className="likes" style={{ fontSize: "20px", cursor: "pointer" }} />
              ) : (
                <MdOutlineFavoriteBorder style={{ fontSize: "20px", cursor: "pointer" }} />
              )}
            </p>
            <p>{likesCount}</p>
          </div>
          <div className="postImpressed" style={{ gap: "5px" }}>
            <p onClick={() => setIsComments(!isComments)}>
              <FaRegComment style={{ fontSize: "20px", cursor: "pointer" }} />
            </p>
            <p>{comments ? comments.length : ""}</p>
          </div>
        </div>
      </div>
      {isComments && (
        <div className="commentContainer">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <input type="text" maxLength={20} placeholder="Enter your comments" name="cmt" style={{ width: "80%", border: "none", outline: "none", borderBottom: "1px solid black" }} value={cmt} onChange={(e) => setCmt(e.target.value)}
            />
            <BiSolidSend style={{ fontSize: "20px", cursor: "pointer" }} onClick={sendComment} />
          </div>
          <h5 className="my-3">Comments</h5>
          {comments?.map((com, index) => (
            <div key={index}>
              <p className="comment" style={{  fontWeight: "600", color: "blue" }}>{com.firstName}</p>
              <p className="mx-5"><BsArrowReturnRight  style={{marginTop:"-3px"}}/> {com.comment}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Post;
