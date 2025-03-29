const express=require("express");
const router=express.Router();
const asyncWrap=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js")
const expressError=require("../utils/expressError");
const lists= require("../models/listing.js");
const {loggedIn,isOwner}=require("../middleware.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

const listingController=require("../controller/listing.js");


//all listing//add new list
router.route("/")
.get(asyncWrap(listingController.index))
 .post(loggedIn,upload.single('image'),asyncWrap(listingController.addListing )) 

 //filter route
router.get("/filter/:catagory",asyncWrap(listingController.filterListing))

//search router
router.get("/search",asyncWrap(listingController.searchListing))

//new listing
router.get("/new", loggedIn,listingController.renderForm)
  
//edit route
router.get("/edit/:id",loggedIn,isOwner,asyncWrap(listingController.editListing))



//update and show route
router.route("/:id")
.put(isOwner ,upload.single('listing[image][url]'),asyncWrap(listingController.updateListing))
.get(asyncWrap( listingController.showListing))

//delete route
router.delete("/:id/delete",loggedIn,isOwner ,asyncWrap(listingController.deleteListing))
  

module.exports=router;
  
  
  