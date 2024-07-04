const mongoose=require("mongoose");
const Review=require("./review.js")
const Schema=mongoose.Schema;
const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image: {
        filename: {
            type: String,
            default: "default.jpg"
        },
        url: {
            type: String,
            default: "https://example.com/default-image.jpg",
            set: v => v === "" ? "https://example.com/default-image.jpg" : v
        }
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
    
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
