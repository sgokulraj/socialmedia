import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: String,
  description : String,
  picturePath: String,
  userPicturePath : String,
  likes:{
    type:Map,
    of: Boolean //value
  },
  comments:{
    type: Array,
    default: []
  }
},{
    timestamps:true
})

const Post = model("Post",postSchema)

export default Post
// module.exports = Post



