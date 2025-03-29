const reviews= require("../models/review.js");
const lists= require("../models/listing.js");

module.exports.reviewForm=async(req,res)=>{
    let {id}=req.params;
    let list=await lists.findById(id);
    console.log(list);
    res.render('./listing/reviewForm.ejs',{list})
  }

module.exports.addReview=async(req,res)=>{
    let {id}=req.params;
   let {rating,comment}=req.body;
   let list=await lists.findById(id);
  
    let newReview=new reviews({
      rating:rating,
      comment:comment
    }) 
    newReview.author=req.user._id;
    console.log(newReview.author);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save()
    req.flash("success","Review created successfully!")
   res.redirect(`/listing/${id}`);
  }

module.exports.deleteReview=async(req,res)=>{
    console.log("deleted");
    let {id,reviewId}=req.params;
    let review=await reviews.findById(reviewId);
    if(!review.author.equals(req.user._id)){
      req.flash("error","Yoy cannot delete this review");
      return res.redirect(`/listing/${id}`);
    }
    await lists.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await reviews.findByIdAndDelete(reviewId);
    console.log("deleted");
    req.flash("success","Review deleted successfully!")
    res.redirect(`/listing/${id}`);
  }