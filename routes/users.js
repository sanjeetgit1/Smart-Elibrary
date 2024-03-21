const mongoose=require('mongoose')
const plm=require('passport-local-mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/Smart-Elibrary")

const userModel=mongoose.Schema({
  username:String,
  email:String,
  password:String
})

userModel.plugin(plm)
module.exports=mongoose.model('user',userModel);