const authRoutes=require('express').Router();
const { hashGenerator,hashValidator} = require('../Bcrypt/hashing');
const User=require('../models/userSchema');
 
authRoutes.get('/',(req,res)=>{
    res.send('authRoutes working');
})

authRoutes.post('/signup',async (req,res)=>{
    console.log(req.body);
    try {
        const existingUser=await User.findOne({emailid:req.body.emailid})
        console.log("existingUser :" + existingUser);
        if(!existingUser || existingUser===null){
            const hashPassword=await hashGenerator(req.body.password);
            const user=await User.create({
                username:req.body.name,
                emailid:req.body.email,
                password:hashPassword
            })
            
            res.status(200).json({
                status:"Succes",
                data:user
            })  
        }
        else{
             res.status(400).json({
                status:'Failed',
                message:'email already exists'
            })
        }
        
    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})

authRoutes.post('/signin',async (req,res)=>{
   
    try {
        const existingUser=await User.findOne({emailid:req.body.email});
        console.log(existingUser);
        if(!existingUser || existingUser===null){
            res.status(400).json({
                status:'Failed',
                message:'email not exists'
            })
        }
        else{
            const hash = hashValidator(req.body.password,existingUser.password);
            if(hash){
                res.status(200).json({
                    status:"success",
                    message:"signin succesfully",
                    username:existingUser.username,
                    id:existingUser._id
                })
            }
            else{
                res.status(400).json({
                    status:'Failed',
                    message:"Invalid emailid or password "
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message
        })
    }
    

        
})

module.exports = authRoutes;