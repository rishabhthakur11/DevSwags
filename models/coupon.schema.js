import mongoose from "mongoose"

const couponSchema = new mongoose.schema(
    {
        code:{
            type:String,
            required:[true,"Please provide the coupon name"],
        },
        discount:{
            type:Number,
            default:0
        },
        active:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps: true

    }

)

export default mongoose.model("coupon",couponSchema);