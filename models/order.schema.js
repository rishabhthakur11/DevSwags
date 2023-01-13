import mongoose from "mongoose";
import orderStatus from "../utils/orderStatus";
import paymentMode from "../utils/paymentMode";

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
          },
          count: Number,
          price: Number,
        },
      ],
      required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    phoneNumber:{
        type:Number,
        required:[true,"Please provide the phone Number"]
    },
    address:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    coupon: String,
    transactionId: String,
    status:{
        type:String,
        enum: Object.values(orderStatus),
        default: orderStatus.ORDERED,
    },
    paymentMode: {
        type: String,
        enum: Obejct.values(paymentMode),
        default: paymentMode.COD,
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("order", orderSchema);
