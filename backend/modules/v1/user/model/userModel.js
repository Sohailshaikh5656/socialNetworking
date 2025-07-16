let database = require("../../../../configure/database")
const responseCode = require("../../../../utilities/responseCode");
const common = require("../../../../utilities/common");
const { OPERATION_FAILED } = require("../../../../utilities/responseCode");
const jwt = require('jsonwebtoken');

require('dotenv').config();


class userModel {
    constructor() { }

    async signup(requestData) {
        try {
            const userData = {
                username: requestData.username,
                email: requestData.email,
                name: requestData.name,
                password: await common.getHashedPassword(requestData.password),
                bio: requestData.bio,
                avtar: requestData.avatar
            }
            const chekUsername = await common.checkUsername(requestData.username)
            console.log("this is ", chekUsername)
            if (chekUsername) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "username Already Exits",
                    data: `Error in Inserting User | Username Already Exists Try with Another Username !`
                }
            }
            const checkEmail = await common.checkEmail(requestData.email)
            console.log("this is ", checkEmail)
            if (checkEmail) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "Email Already Exits",
                    data: `Error in Inserting User | Email Already Exists Try with Another Email !`
                }
            }
            const [result] = await database.query("INSERT INTO tbl_user SET ?", userData, (error) => {
                if (error) {
                    throw new Error(`Database Error  : ${error}`)
                }
            })

            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_inserting",
                    data: `Error in Inserting User | No Row Affected !`
                }
            }
            let JWTToken = jwt.sign(
                { user_id: result.insertId }, process.env.SECRET_KEY, { "expiresIn": "1d" }
            )
            console.log("this is User ID", result.insertId)
            // let tokenData = {
            //     user_id : result.insertId,
            //     token : await common.genereateToken(),
            //     device_token : await common.genereateToken(),
            //     os_version : "12.5",
            //     device_type : "A"
            // }
            // const [token] = await database.query("INSERT INTO tbl_device SET ?",tokenData,(error)=>{
            //     if(error){
            //         throw new Error(`Error in Database Query : ${error}`)
            //     }
            //     if(token.affectedRows<=0){
            //         return {
            //             code : responseCode.OPERATION_FAILED,
            //             keyword : "error_in_inserting",
            //             data : `Error in Inserting Token | No Row Affected !`
            //         }
            //     }
            // })
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: {
                    message: "user Register Successfully !",
                    username: requestData.username,
                    email: requestData.email,
                    name: requestData.name,
                    bio: requestData.bio,
                    jwtToken: JWTToken,
                    id: result.insertId
                }
            }
        } catch (error) {
            console.log("This is Error", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.data || error
            }
        }
    }

    uploadProfile(req) {
        if (!req.file) {
            return {
                code: responseCode.OPERATION_FAILED,
                message: { keyword: 'text_upload_profile_fail', content: {} },
                data: {}
            }
        } else {
            return {
                code: responseCode.SUCCESS,
                message: { keyword: 'text_upload_profile_success', content: {} },
                data: req.file.filename
            }
        }
    }

    async signin(requestData) {
        try {
            let email = requestData.email
            const [result] = await database.query("SELECT * FROM tbl_user WHERE is_active=1 AND is_deleted=0 AND email = ?", [email], (error) => {
                if (error) {
                    throw new Error(`Data base Error : ${error}`)
                }
            })
            if (result.length <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "email not found",
                    data: "Email Not Found or Entered Wrong Email"
                }
            }
            const compare = await common.comparePasswords(requestData.password, result[0].password)
            if (!compare) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "password not matched",
                    data: "Entered a Wrong Password !"
                }
            }
            let JWTToken = jwt.sign(
                { user_id: result[0].id }, process.env.SECRET_KEY, { "expiresIn": "1d" }
            )
            delete result[0].password
            result[0].msg = "User Login Successfully !"
            result[0].jwtToken = JWTToken
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: result[0]
            }

        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.data || error
            }
        }
    }

    async newPost(requestData) {
        try {
            let newPostData = {
                title: requestData.title,
                description: requestData.description,
                image: requestData.image,
                user_id: requestData.user_id
            }

            const [result] = await database.query("INSERT INTO tbl_post SET ?", newPostData)
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_insertion",
                    data: "Error in Insertion"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "post_created",
                data: "Post Created Successfully"
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.data || error
            }
        }
    }

    async postComment(requestData) {
        try {
            const comment = {
                post_id: requestData.post_id,
                user_id: requestData.user_id,
                comments: requestData.comment
            }
            const [result] = await database.query("INSERT INTO tbl_comments SET ?", comment)

            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_insertion",
                    data: "Error in posting comment"
                }
            }

            const [calculateComments] = await database.query("UPDATE tbl_post SET total_comments = (SELECT COUNT(*) FROM tbl_comments WHERE post_id = ?) WHERE id = ?", [requestData.post_id, requestData.post_id])
            if (calculateComments.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_updating_comment_count",
                    data: "Error in updating comment count"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "comment_posted",
                data: "Comment posted successfully"
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.data || error
            }
        }
    }

    async fetchComments(requestData) {
        try {
            requestData.id = parseInt(requestData.id.toString().replace(/"/g, ''));
            const [result] = await database.query(
                "SELECT c.*, u.username, u.avtar FROM tbl_comments c " +
                "JOIN tbl_user u ON c.user_id = u.id " +
                "WHERE c.post_id = ? AND c.is_active=1 AND c.is_deleted=0",
                [requestData.id]
            );
            if (result.length <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "no_comments",
                    data: "No Comments Found"
                }
            }
            console.log(result)
            return {
                code: responseCode.SUCCESS,
                keyword: "comments_fetched",
                data: result
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.data || error
            }
        }
    }

    async myPostListing(requestData) {
        try {
            const [result] = await database.query(`SELECT p.*,
            CASE 
            WHEN EXISTS(SELECT 1 FROM tbl_likes WHERE user_id = ? AND post_id = p.id AND is_deleted=0 AND is_active=1) THEN "LIKED"
            ELSE "NOTLIKED"
            END as LIKESTATUS
            FROM tbl_post as p WHERE p.is_active = 1 AND p.is_deleted=0 AND p.user_id=?`, [requestData.user_id, requestData.user_id])
            if (result.length <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "no_post",
                    data: "No Post There"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "post_fetched",
                data: result
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.data || error
            }
        }
    }

    async getAllPosts(requestData) {
        try {
            const [result] = await database.query(`
            SELECT p.*,(SELECT username FROM tbl_user WHERE id = p.user_id) as username,
                    CASE 
                        WHEN EXISTS(
                            SELECT 1 
                            FROM tbl_likes 
                            WHERE user_id = ? 
                                AND post_id = p.id 
                                AND is_deleted = 0 
                                AND is_active = 1
                        ) THEN "LIKED"
                        ELSE "NOTLIKED"
                    END as LIKESTATUS
                FROM tbl_post as p
                WHERE p.user_id IN (
                    SELECT f.user_id 
                    FROM tbl_followers as f
                    JOIN tbl_user as u ON u.id = f.user_id
                    WHERE f.follow_id = ?
                        AND u.privacy NOT IN ("private")
                )
                AND p.is_active = 1
                AND p.is_deleted = 0;
            `, [requestData.user_id, requestData.user_id])
            if (result.length <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "no_post",
                    data: "No Post There !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "post_fetched",
                data: result
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.data || error
            }
        }
    }
    async getAllUsers(requestData) {
        try {
            const [result] = await database.query(
                "SELECT id, username, avtar, name FROM tbl_user WHERE is_active=1 AND is_deleted=0 AND id NOT IN (?)",
                [[requestData.user_id]]  // Note the double array for single value
            );
            if (result.length <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_fetching",
                    data: "No User Found !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: result
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.data || error
            }
        }
    }
    
    async updateProfile(requestData) {
        try {
            const userData = {
                username: requestData.username,
                name: requestData.name,
                email: requestData.email,
                bio: requestData.bio,
                privacy: requestData.privacy
            }
            if (requestData.avatar && typeof requestData.avatar === 'string' && requestData.avatar.trim() !== "" && requestData.avatar !== "[object Object]") {
                userData.avtar = requestData.avatar;
            }
            const [result] = await database.query("UPDATE tbl_user SET ? WHERE id = ? AND is_active=1 AND is_deleted=0", [userData, requestData.user_id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_updating",
                    data: "Failed to Update Profile"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "Profile Updated Successfully !"
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error?.data || error
            }
        }
    }

    async getProfile(requestData) {
        try {
            const [result] = await database.query("SELECT *, (SELECT COUNT(*) FROM tbl_post as p WHERE p.is_active=1 AND p.is_deleted=0 AND p.user_id = u.id) as posts FROM tbl_user as u WHERE u.id = ? AND u.is_active=1 AND u.is_deleted = 0", [requestData.user_id])
            if (result.length <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_fetching",
                    data: "Error | No User Found !"
                }
            }
            // console.log("This is User :",result[0])
            delete result[0].password
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: result[0]
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error?.data || error
            }
        }
    }

    async getOtherProfile(requestData) {
        try {
            requestData.id = parseInt(requestData.id.toString().replace(/"/g, ''));
            const [result] = await database.query(`SELECT * , 
                CASE 
                    WHEN EXISTS(SELECT 1 FROM tbl_followers WHERE user_id = ? AND follow_id = ?) THEN "FOLLOWED"
                    ELSE "NOTFOLLOWED"
                END as FOLLOWMARK
                FROM tbl_user WHERE id = ? AND is_active=1 AND is_deleted=0`, [requestData.id, requestData.user_id, requestData.id])

            if (result.length <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_fetching",
                    data: "Error | No User Found !"
                }
            }

            delete result[0].password
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: result[0]
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error?.data || error
            }
        }
    }


    async getOtherPost(requestData) {
        try {
            requestData.id = parseInt(requestData.id.toString().replace(/"/g, ''));
            const [isRestricted] = await database.query(`SELECT privacy FROM tbl_user WHERE id = ?`, [requestData.id])
            if (isRestricted[0].privacy == "follower") {
                const [checkFollower] = await database.query("SELECT follow_id FROM tbl_followers WHERE user_id = ? AND follow_id = ?", [requestData.id, requestData.user_id])
                if (checkFollower.length <= 0) {
                    return {
                        code: responseCode.NO_DATA_FOUND,
                        keyword: "restricetd",
                        data: "Private Account"
                    }
                }
            } else if (isRestricted[0].privacy == "private") {
                return {
                    code: responseCode.NO_DATA_FOUND,
                    keyword: "restricetd",
                    data: "Private Account"
                }
            }
            const [result] = await database.query(`SELECT *, CASE 
                WHEN EXISTS(SELECT 1 FROM tbl_likes WHERE user_id = ? AND post_id = p.id AND is_deleted=0 AND is_active=1) THEN "LIKED"
                ELSE "NOTLIKED"
                END as LIKESTATUS FROM tbl_post as p WHERE is_active = 1 AND is_deleted=0 AND user_id=?`, [requestData.user_id, requestData.id])
            if (result.length <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "no_post",
                    data: "No Post There"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "post_fetched",
                data: result
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error?.data || error
            }
        }
    }

    async followStateManage(requestData) {
        try {
            console.log("This is Request Data", requestData)
            if (requestData.status == "unfollow") {
                const [response] = await database.query("DELETE FROM tbl_followers WHERE user_id = ? AND follow_id = ?", [requestData.id, requestData.user_id])
                if (response.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "error_in_deleting",
                        data: "Error in Unfollowing User"
                    }
                }
            } else {
                const data = {
                    user_id: requestData.id,
                    follow_id: requestData.user_id
                }
                const [response] = await database.query("INSERT INTO tbl_followers SET ? ", data)
                if (response.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "error_in_inserting",
                        data: "Error in Following User"
                    }
                }
            }
            const [followerCount] = await database.query(`UPDATE tbl_user SET followers = (SELECT COUNT(*) FROM tbl_followers WHERE user_id = ?) WHERE id = ? `, [requestData.id, requestData.id])
            const [followingCount] = await database.query(`UPDATE tbl_user SET following = (SELECT COUNT(*) FROM tbl_followers WHERE follow_id = ?) WHERE id = ? `, [requestData.user_id, requestData.user_id])
            if (followerCount.affectedRows <= 0 && followingCount.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_updating",
                    data: "Error in Managing Follower and Following"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "State Changed !"
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error?.data || error
            }
        }
    }

    async likeStateManage(requestData) {
        try {
            if (requestData.state == "unlike") {
                let [response] = await database.query("DELETE FROM tbl_likes WHERE post_id = ? AND user_id = ?", [requestData.post_id, requestData.user_id])
                if (response.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "error_in_deleting",
                        data: "Error in Remove Likes From Post"
                    }
                }
            } else {
                let likeData = {
                    post_id: requestData.post_id,
                    user_id: requestData.user_id
                }
                let [response] = await database.query(`INSERT INTO tbl_likes SET ?`, likeData)
                if (response.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "error_in_inserting",
                        data: "Error in Liking Post"
                    }
                }
            }

            const [result] = await database.query(`UPDATE tbl_post SET total_likes = (SELECT COUNT(*) FROM tbl_likes WHERE post_id = ?) WHERE id = ?`, [requestData.post_id, requestData.post_id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_updating",
                    data: "Error in Updating The Total Post Likes"
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "Like Status Changed"
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error?.data || error
            }
        }
    }
}

module.exports = new userModel()