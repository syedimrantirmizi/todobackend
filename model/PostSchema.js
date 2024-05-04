import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

const PostModel = mongoose.model("Posts", PostSchema);

export default PostModel;
