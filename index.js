const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const instPostRouter = require('./routes/instaPost')
const authRoutes=require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json());


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/post',instPostRouter)
app.use('/comments',commentRoutes)
app.use('/api/user',authRoutes);

app.get('/',(req,res)=>{
    res.send('Backend connected')
})
mongoose.connect(process.env.MONGODB_URL).then((res)=>console.log("Database connected")).catch((e)=>console.log(e))

app.listen(process.env.PORT || 4000,()=>console.log(`server Started http://localhost:${process.env.PORT}`))