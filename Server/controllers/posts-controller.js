import Post from "../models/Postmodel.js";
import User from "../models/Usermodel.js";

//Create Post

export const createPost = async (req, res) => {
  try {
    const { userId, description, file } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: file,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

//Read

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

//Update Likes

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true } // to return the updated value 
    );

    res.status(200).json(updatePost)

  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id, userId } = req.params
    console.log(userId)
    const posts = await Post.findById(id)
    const isAuthor = (JSON.stringify(userId) === JSON.stringify(posts.userId))
    if (isAuthor) {
      await Post.findByIdAndDelete(id);
      const post = await Post.find()
      res.status(200).json(post)
    } else {
      res.status(401).json("You aren't permitted")
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
}


export const updateComments = async (req, res) => {
  try {
    const { id, comment, firstName } = req.params;
    const post = await Post.findById(id);
    post.comments.push({ firstName, comment })
    const updatedpost = await Post.findByIdAndUpdate(id, { comments: post.comments }, { new: true })
    // const updatedposts = await Post.find()
    res.status(200).json(updatedpost)

  } catch (error) {
    res.status(400).send(error.message)
  }
}
