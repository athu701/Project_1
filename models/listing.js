const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("../models/review.js")

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        url:String,
        filename:String
    },
    price:Number,
    location:String,
    country:String,
    tag: {
        type: String,
        enum: ["Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic","None"],
        default: "None" 
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    avgRating:{
        type:Number,
        default:0
    },
});

 listingSchema.post("findOneAndDelete",async(listing)=>{
     if(listing){
         await Review.deleteMany({_id : {$in: listing.reviews}});
     }
 });

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;