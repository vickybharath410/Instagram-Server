const commentRoutes=require('express').Router();
const Comments=require('../models/commentSchema');

commentRoutes.post('/',async (req,res)=>{
    console.log(req.body);
    const comment=await Comments.create(req.body)
    res.send(comment)
})
commentRoutes.get('/:id',async(req,res)=>{
    // console.log(req.params.id);
    const entireComment=await Comments.find({ownerid:req.params.id})
    res.send(entireComment)
    // res.send(req.params)
    
})
module.exports = commentRoutes;
