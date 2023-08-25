import Navbar from "./Navbar";
import User from "./User";
import "../Stylesheet/Home.css";
import { useSelector } from "react-redux";
import Mypost from "./Mypost";
import Posts from "./Posts"
import Friendslist from "./Friendslist";

function Home() {
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <main>
      <Navbar />
      <div className="homeContainer">
        <div className="userProfile">
          <User userId={_id} picturePath={picturePath} />
        </div>
        <div className="userPosts">
          <Mypost picturePath={picturePath} />
          <Posts userId={_id}/>
        </div>
        <div className="friendsList">
          <Friendslist userId={_id} />
        </div>
      </div>
    </main>
  );
}

export default Home;
