import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import User from "./User";
import Mypost from "./Mypost";
import Posts from "./Posts";
import Friendslist from "./Friendslist";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Stylesheet/Profile.css"

function Profile() {
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await res.json();
    setUser(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <div className="profilepage">
      <Navbar />
      <div className="profileContainer">
        <div className="userProfile">
            <User userId={userId} picturePath={user.picturePath}/>
            <div style={{marginTop:"2rem", marginBottom:"2rem"}}></div>
            <Friendslist userId={userId}/>
        </div>
        <div className="profilePost">
            <Mypost picturePath={user.picturePath}/>
            <div style={{marginTop:"2rem", marginBottom:"2rem"}}></div>
            <Posts userId={userId} isProfile/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
