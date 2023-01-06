const router = require('express').Router()
const InstaPost = require('../models/instaSchema')
const cloudinary = require("../clodinary/clodinary")

router.get("/fetch",async(req,res)=>{
    try {
        console.log(req.body)
        const posts = await InstaPost.find().sort({_id:'-1'});
        res.json({
            status:"success",
           posts
        })
        
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message
        })
    }
})

router.get('/',async(req,res)=>{
    const skip=req.query.skip?Number(req.query.skip):0
    const defaultLimit=10;
    try {
        const newdata=await InstaPost.find().skip(skip).limit(defaultLimit);
        res.send(newdata)
    } catch (error) {
        return error;
    }
})

router.post('/upload',async(req,res)=>{
    console.log(req.body)
    const {name,location,description,imageUrl}=req.body
    try {
      const uploadedResponse = await cloudinary.v2.uploader.upload(imageUrl,
        {  upload_preset: "InstaClone"}, 
        function(error, result) {
            if(error){
                console.log(error,"Connot upload")
                res.sendStatus(500)
            }
            else
                console.log(result);
                return {url:result.secure_url,public_id:result.public_id} 
        });
        if(uploadedResponse){
            console.log(uploadedResponse)
            const posts = await InstaPost.create({
                name,
                location,
                description,
                imageUrl:{
                    imageUrl:uploadedResponse.url,
                    public_id:uploadedResponse.public_id
                }
            });
            res.json({
                status:"success",
               posts
            })
        }
        else{
            res.sendStatus(500)
        }
        
        
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message
        })
    }
})

module.exports= router;