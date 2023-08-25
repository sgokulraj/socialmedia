import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../ReduxState/index.js";
import "../Stylesheet/Mypost.css";
import {AiOutlineEdit, AiOutlineAudio} from "react-icons/ai"
import {MdDeleteOutline} from "react-icons/md"
import {BiImageAdd} from "react-icons/bi"
import {FaVideo} from "react-icons/fa"
import FileBase from "react-file-base64"

function Mypost({ picturePath }) {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [postDescription, setPostDescription] = useState("");
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState("");
  const [isImage, setIsImage] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", postDescription);
    if (files) {
      formData.append("file", files);
    }
    const res = await fetch("https://smoggy-lamb-waders.cyclic.cloud/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await res.json();
    if(res.ok){
      alert("Post created successfully")
    }
    dispatch(setPosts({ posts }));

    setImage(null);
    setIsImage(false)
    setFiles("")
    setPostDescription("");
  };
  return (
    <main className="mypostContainer">
      <div className="postInput">
        <div className="postUserImgContainer">
          <img
            src={picturePath}
            alt={`${_id}`}
            className="postUserImg"
          />
        </div>
        <input
          type="text"
          placeholder="Log your Thoughts here"
          className="userPost"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
      </div>
      {isImage && (
        <div className="uploadImg">
           <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  // setFormFields({ ...formFields, fileUploads: base64 })
                  setFiles(base64)
                }
              />
        </div>
      )}
      <hr/>
      <div className="attachmentIcon">
        <div className="icon attachmentIcon" onClick={()=>setIsImage(!isImage)}>
            <BiImageAdd className="mediaIcon"/> 
            <p className="icontext">Image</p>
        </div>
        <div className="icon attachmentIcon">
            <FaVideo className="mediaIcon"/> 
            <p className="icontext">Clip</p>
        </div>
        <div className="icon attachmentIcon">
            <AiOutlineAudio  className="mediaIcon"/> 
            <p className="icontext">Audio</p>
        </div>
        <button disabled={!postDescription} onClick={handleSubmit} className="postBtn">Post</button>
      </div>
    </main>
  );
}

export default Mypost;
