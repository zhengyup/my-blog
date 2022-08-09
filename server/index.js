const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require("body-parser");
const Post = require("./models/Post");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;

mongoose.connect("mongodb+srv://Admin-zy:zyadmin@cluster0.yupzz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

app.route("/")
    .get((req,res) => {
    Post.find((foundPosts,err) => {
        if (!err) {
            res.json(foundPosts);
        } else{
            res.send(err);
        }
    });
})
    .post((req,res) => {
        const newPost = new Post(
        {
            title : req.body.title,
            content : req.body.content
        });
        newPost.save();
        res.send("New post created!");
    });

app.route("/posts/:id")
    .get((req,res) => {
        Post.findOne({_id : req.params.id},(foundPost, err) => {
            if (err){
                res.send(err)
            } else {
                if (foundPost) {
                    res.json(foundPost);
                }
            else {
                res.send("No matching post was found.")
            }
            }
        });
    })
    .delete((req,res) => {
        Post.findOneAndDelete({_id : req.params.id}, (foundPost,err) => {
            if (err){
                res.send(err);
            } else {
                if (foundPost){
                    res.send("Post Deleted!");
                } else {
                    res.send("No matching post was found");
                }
            }
        })
    })


app.listen(process.env.PORT||5000, ()=> {
    console.log("Server is up and running on port 5000");
});