import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../ReduxState/index.js";
import { useEffect } from "react";
import Post from "./Post.js";

function Posts({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const getPosts = async () => {
    const res = await fetch("https://smoggy-lamb-waders.cyclic.cloud/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);
  return (
    <div>
      {posts?.length
        ? posts.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
            }) => (
              <Post
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
              />
            )
          )
        : ""}
    </div>
  );
}

export default Posts;
