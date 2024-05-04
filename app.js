import express from "express";
import mongoose from "mongoose";
import PostModel from "./model/PostSchema.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

const uri =
  "mongodb+srv://syedimrantirmizi:r2nFqc86NCHZYI0e@cluster0.ke2xo8c.mongodb.net/";
mongoose
  .connect(uri)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("error = ", error.message));

app.post("/createpost", async (req, res) => {
  try {
    const { value, userID } = req.body;
    if (!value || !userID) {
      res.json({
        message: "Required Fields are missing",
        status: false,
      });
    }
    const obj = {
      value: value,
      userID: userID,
    };
    const postResponse = await PostModel.create(obj);
    res.json({
      message: "Post Created",
      data: postResponse,
      status: true,
    });
  } catch (error) {
    res.json({
      Error: error.message,
      data: [],
      status: false,
    });
  }
});

app.get("/getpost", async (req, res) => {
  try {
    const allPost = await PostModel.find({});
    res.json({
      message: "successfully Found",
      data: allPost,
      status: true,
    });
  } catch (error) {
    res.json({
      Error: error.message,
      data: [],
      status: false,
    });
  }
});

app.put("/updatepost/:id", async (req, res) => {
  try {
    const postID = req.params.id;
    const { value } = req.body;
    if (!value) {
      res.json({
        message: "Required Field is missing",
        status: false,
      });
    }
    const obj = {
      value: value,
    };
    const postResponse = await PostModel.findByIdAndUpdate(postID, obj, {
      new: true,
    });
    res.json({
      message: "Post Created",
      data: postResponse,
      status: true,
    });
  } catch (error) {
    res.json({
      Error: error.message,
      data: [],
      status: false,
    });
  }
});
app.delete("/deletepost/:id", async (req, res) => {
  try {
    const postID = req.params.id;
    const postResponse = await PostModel.findByIdAndDelete(postID);
    res.json({
      message: "Post deleted",
      status: true,
    });
  } catch (error) {
    res.json({
      Error: error.message,
      data: [],
      status: false,
    });
  }
});

app.get("/", (request, response) => {
  response.json({
    message: "Server Up",
  });
});

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}/`)
);
