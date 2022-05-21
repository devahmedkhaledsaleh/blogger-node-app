const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postImage:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required: true
    }
},{timestamps:true});

const Post = mongoose.model("Posts",PostSchema);

module.exports = Post;