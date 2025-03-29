const lists= require("./models/listing.js");

module.exports.loggedIn=(req,res,next)=>{
     console.log(req._parsedOriginalUrl.pathname);
    if(!req.isAuthenticated()){
        req.session.redirectPath=req._parsedOriginalUrl.pathname;
        req.flash("error","You must be login");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectPath){
        res.locals.redirectUrl=req.session.redirectPath;
    }

next();
}

//authorization for listing
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await lists.findById(id);
   
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        console.log(listing.title);
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
}


// listing schema validation middleware
const validateListing=((req,res,next)=>{
  const result=listingSchema.validate(req.body);
  if(result){
    console.log(result);
    throw new expressError(400,result.error)
  }
  else{
    next();
  }
})

// review schema validation middleware
const validateReview=((req,res,next)=>{
    const result=reviewSchema.validate(req.body);
    if(result){
      console.log(result);
      throw new expressError(400,result.error)
    }
    else{
      next();
    }
  })