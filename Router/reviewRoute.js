const express=require("express");
const router=express.Router();
const asyncWrap=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js")
const expressError=require("../utils/expressError");
const reviews= require("../models/review.js");
const lists= require("../models/listing.js");
const {loggedIn}=require("../middleware.js");


const reviewController=require("../controller/review.js");

router.route("/:id")
.get(loggedIn,asyncWrap(reviewController.reviewForm)) //form
.post(asyncWrap(reviewController.addReview))    //create review

//delete review
router.delete("/:id/:reviewId",loggedIn,asyncWrap(reviewController.deleteReview))

module.exports=router;