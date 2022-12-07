const mongoose = require("mongoose");
import AuthRoles from "../utils/authRoles"

const userschema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Name is required"],
            maxLength:[50,"Name must be less than 50 characters"]

        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true
            
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            minLength:[8,"Password must be atleat 8 character"],
            select:false
        },
        role:{
            type:String,
            enum:Object.values(AuthRoles),
            default:AuthRoles.USER
        },
        forgetPasswordToken:String,
        forgetPasswordExpiry:Date,

    },
    {
        timestamps:true
    }

)
export default mongoose.model("User",userschema);


