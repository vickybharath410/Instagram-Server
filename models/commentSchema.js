const mongoose=require('mongoose');
const commentSchema= new mongoose.Schema({
    username:{type:String,require:true},
    userid:{type:mongoose.Types.ObjectId,ref:'users'},
    ownerid:{type:mongoose.Types.ObjectId,ref:'instaposts'},
    comments:{type:String,require:true}
})

module.exports = mongoose.model('Comments',commentSchema);