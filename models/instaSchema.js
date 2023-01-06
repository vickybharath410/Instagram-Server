const mongoose = require('mongoose')

const instaSchema = mongoose.Schema({
    name:{type:String,required:true},
    location:String,
    imageUrl:{
        imageUrl:{type:String},
        public_id:{type:String,required:true}
    },
    description:String,
    date:{type:Date,required:true,default:Date.now()}
})

const InstaPost = mongoose.model('InstaPost',instaSchema)

module.exports = InstaPost;