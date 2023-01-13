import mongoose from "mongoose"

const productSchema = new mongoose.schema(
    {
        name:{
            type:String,
            required:[true,"Provide the name"],
            trim:true,
            maxLength:[120,"Name should not exceed 120 characters"]
        },
        price:{
            type:Number,
            required:[true,"Provide the number"],
            maxLength:[5,"Price should not exceed 5 digits"]
        },
        description:{
            type:String,
            required:[true,"Provide the description"],
            trim:true,
            maxLength:[300,"Description should not exceed 300 characters"]
        },
        photos:[
            {
                secured_url:{
                    type:String,
                    required: true,
                }
            }
        ],
        stoke:{
            type:Number,
            default:0
        },
        sold:{
            type:Number,
            default:0
        },
        collectionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"collection",        
        } 

    },
    {
        timestamps:true
    }

)

export default mongoose.modal("product",productSchema)