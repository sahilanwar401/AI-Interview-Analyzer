import mongoose from "mongoose";


const blackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be blacklisted"]
    },
    
},{
    timestamps:true
})
 const tokenBlackListModel = await mongoose.model("blacklistToken",blackListTokenSchema)
  export default tokenBlackListModel;       