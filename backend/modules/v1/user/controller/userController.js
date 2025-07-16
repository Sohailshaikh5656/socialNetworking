const middleware = require("../../../../middleware/validation")
const { decryptPlain } = require("../../../../utilities/encryption")
const validationRules = require("../../../../utilities/rules")
const userModel = require("../model/userModel")

class userController {
     constructor() {

     }
     async signup(req, res) {
          try {
               let requestData = req.body
               const newUser = validationRules.newUser
               const { error, value } = newUser.validate(requestData)
               if (error) {
                    console.log("Validation Error :", error.details)
                    return middleware.encriptData(req, res, { error: details[0].message })
               }

               let message = await userModel.signup(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }

     uploadProfile(req, res) {
          try {
              const responseData = userModel.uploadProfile(req);
              return middleware.encriptData(req, res, responseData)
          } catch (error) {
               return middleware.encriptData(req, res, error);
          }
      }

     async signin(req, res) {
          try {
               let requestData = req.body
               const validateUser = validationRules.validateUser
               const { error, value } = validateUser.validate(requestData)
               if (error) {
                    console.log("Validation Error :", error.details)
                    return middleware.encriptData(req, res, { error: details[0].message })
               }

               let message = await userModel.signin(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     async newPost(req, res) {
          try {
               let requestData = req.body
               const newPost = validationRules.newPost
               const { error, value } = newPost.validate(requestData)
               if (error) {
                    console.log("Validation Error :", error.details)
                    return middleware.encriptData(req, res, { error: details[0].message })
               }
               requestData.user_id = req.user_id
               let message = await userModel.newPost(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     async postComment(req, res) {
          try {
               let requestData = req.body
               const postComment = validationRules.postComment
               const { error, value } = postComment.validate(requestData)
               if (error) {
                    console.log("Validation Error :", error.details)
                    return middleware.encriptData(req, res, { error: details[0].message })
               }
               requestData.user_id = req.user_id
               let message = await userModel.postComment(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }

     async fetchComments(req, res) {
          try {
               console.log("Comments Called")
               let requestData = {}
               requestData.id = decryptPlain(req.params.id)
               requestData.user_id = req.user_id
               let message = await userModel.fetchComments(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     async myPostListing(req, res) {
          try {
               let requestData = {}
               requestData.user_id = req.user_id
               let message = await userModel.myPostListing(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     async getAllPosts(req, res) {
          try {
               let requestData = {}
               requestData.user_id = req.user_id
               let message = await userModel.getAllPosts(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     
     async followStateManage(req, res) {
          try {
               let requestData = req.body
               requestData.user_id = req.user_id
               console.log("User ID : ",req.user_id)
               let message = await userModel.followStateManage(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     
     async likeStateManage(req, res) {
          try {
               let requestData = req.body
               requestData.user_id = req.user_id
               let message = await userModel.likeStateManage(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     async getAllUsers(req, res) {
          try {
               let requestData = {}
               requestData.user_id = req.user_id
               let message = await userModel.getAllUsers(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     async getOtherProfile(req, res) {
          try {
               let requestData = {}
               requestData.id = decryptPlain(req.params.id)
               console.log("ID : ",requestData.id)
               requestData.user_id = req.user_id  
               let message = await userModel.getOtherProfile(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     async getOtherPost(req, res) {
          try {
               let requestData = {}
               requestData.id = decryptPlain(req.params.id)
               console.log("ID : ",requestData.id)
               requestData.user_id = req.user_id  
               let message = await userModel.getOtherPost(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     async getProfile(req,res){
          try {
               console.log("Data !")
               let requestData = {}
               requestData.user_id = req.user_id
               let message = await userModel.getProfile(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
     async updateProfile(req,res){
          try {
               let requestData = req.body
               requestData.user_id = req.user_id
               let message = await userModel.updateProfile(requestData);
               return middleware.encriptData(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.encriptData(req, res, error.message)
          }
     }
}

module.exports = new userController()