const mongoose = require("mongoose");
import AuthRoles from "../utils/authRoles"
import bcryrt from "bcryptjs"
import JWT from  "jsonwebtoken"
import config from "../config";
import crypto from "crypto";



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

// Adding more features to your schema
userschema.methods={
    // compare the password
    comparePassword: async function(enteredPassword){
        return await bcryrt.compare(enteredPassword,this.password);
    },
   // generate the JWT token
   getJwtToken: function(){
    return JWT.sign(
        {
            _id:this._id,
            role:this.role
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRY

        }

    )
   },
   generateForgetPasswordToken: function(){
    const forgotToken = crypto.randomBytes(20).toString('hex');

    // save to DB
    this.forgetPasswordToken = crypto.createHash("sha256").update(forgotToken).digest("hex");
    this.forgetPasswordExpiry = Date.now() + 20 * 60 * 1000;

    // return the value to user 
    return forgotToken;
   } 
}

export default mongoose.model("User",userschema);


