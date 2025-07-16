const userController = require("../controller/userController");
const upload = require("../../../../middleware/multer")
const Auth = require("../controller/userController")
const AuthModel = require("../model/userModel")
const express = require('express');
const router = express.Router();

const userInstance = userController
const userRoute = (app)=>{
    app.post("/v1/user/signup",userInstance.signup);
    app.post('/v1/user/upload-profile',upload.single('profile_img'),userController.uploadProfile);
    app.post("/v1/user/signin",userInstance.signin);
    app.post("/v1/user/newPost",userInstance.newPost);
    app.post("/v1/user/postComment",userInstance.postComment);
    app.get("/v1/user/fetchComments/:id",userInstance.fetchComments);
    app.get("/v1/user/myPostListing",userInstance.myPostListing);
    app.get("/v1/user/getAllPosts",userInstance.getAllPosts);
    app.post("/v1/user/followStateManage",userInstance.followStateManage);
    app.post("/v1/user/likeStateManage",userInstance.likeStateManage);
    app.get("/v1/user/getAllUsers",userInstance.getAllUsers);
    app.post("/v1/user/updateProfile",userInstance.updateProfile);
    app.get("/v1/user/getProfile",userInstance.getProfile);
    app.get("/v1/user/getOtherProfile/:id",userInstance.getOtherProfile);
    app.get("/v1/user/getOtherPost/:id",userInstance.getOtherPost);


}
module.exports = userRoute