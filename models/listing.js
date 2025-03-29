const mongoose=require("mongoose");
const reviews=require("./review.js");

const schema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    // image:{
    //     type:String,
    //     // default:"https://unsplash.com/photos/beige-concrete-building-near-body-of-water-during-daytime-nftTYsOlzrI",
    //     // set:(v)=>v==="" ? "https://unsplash.com/photos/beige-concrete-building-near-body-of-water-during-daytime-nftTYsOlzrI":v
    // },
    image: {  
        filename:{type:String,
            default:"listingimage"},
        url: String
    },
    price:{
        type:Number,
        required: true, 
        default: 0 
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {  type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:
        {  type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    geometry: {
        type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
        coordinates: {
              type: [Number],
              required: true
            }
          },

        catagory:{
          type:String,
          enum:["treanding","mountain","beach","bread and breakfast","amazing pool","tree house","iconic city","palace","arctic","farm","amazing view"],
          default:"treanding"
        }

})


schema.post("findOneAndDelete", async(listing)=>{
  if(listing){
   await reviews.deleteMany({_id:{$in:listing.reviews}});
  }
})

const List=mongoose.model("List",schema);

module.exports=List;
