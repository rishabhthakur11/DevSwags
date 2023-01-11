import mongoose from "mongoose"

const collectionSchema = new mongoose.schema(
    {
        name:{
            type: String,
            required:[true, "please provide the name of the category"],
            trim : true,
            maxLength:[120, "category name not more than 120"]
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("collection",collectionSchema)