const Joi = require("joi")

const newUser = Joi.object({
    username: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6)
                    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
                    .message('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character')
                    .required(),
    bio : Joi.string().required(),
    avatar : Joi.string().required()
})

const validateUser = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required()
})

const newPost = Joi.object({
    image : Joi.string().required(),
    title : Joi.string().required(),
    description : Joi.string().required()
})


const updateProfile = Joi.object({
    first_name : Joi.string().min(3).required(),
    last_name : Joi.string().min(3).required(),
    profile_picture : Joi.string().min(3).required(),
    
})

const postComment = Joi.object({
    comment: Joi.string().min(1).required(),
    post_id: Joi.number().required()
})








//####################################################

//admin Rules

module.exports = {
    newUser, 
    validateUser,
    newPost,
    updateProfile,
    postComment
}