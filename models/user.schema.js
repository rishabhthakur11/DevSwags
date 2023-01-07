const mongoose = require("mongoose");
import AuthRoles from "../utils/authRoles"
import bcryrt from "bcryptjs"
import JWT from  "jsonwebtoken"


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

// @encrypt the user password 

userschema.pre("save",async function(next){
    if(!this.modified("password")) return next();
    this.password = await bcryrt.hash(this.password,10);
    next();

})

export default mongoose.model("User",userschema);


