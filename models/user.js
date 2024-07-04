const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");
const { schema } = require("./review");
const { required } = require("joi");

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    }
    //  username and password is already define in localmongoosemode
});

//for automatically plugin username and password we use plugin
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);