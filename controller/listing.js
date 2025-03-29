const lists= require("../models/listing.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });

module.exports.index=(async(req,res)=>{
    let listings=await lists.find();
    console.log("saved");
    res.render('./listing/index.ejs',{listings});
  })

module.exports.filterListing=(async(req,res)=>{
  let listings=await lists.find();
  let {catagory}=req.params;
   console.log(req.params); 
res.render("./listing/filter.ejs",{catagory,listings});
})

module.exports.searchListing=(async(req,res)=>{
  let listings=await lists.find();
  let {country}=req.query;
  console.log(country);
  res.render("./listing/search.ejs",{country,listings});
})


module.exports.renderForm=(req,res)=>{
    console.log("saved");
    res.render('./listing/new.ejs')
    }

module.exports.addListing=async(req,res)=>{
  let response=await geocodingClient.forwardGeocode({
    query: req.body.location,
    limit: 1
  })
    .send()

  let coordinate=response.body.features[0].geometry
  console.log(response.body.features[0].geometry) ;

    let imageUrl=req.file.path;
    let filename=req.file.filename;
    console.log(imageUrl," .",filename);
    console.log(req.body);
    let {title,description,image,price,location,country,catagory}=req.body;
    let newList=new lists({
      title:title,
      description:description,
      image: { 
        url: imageUrl,
        filename:filename
    },
      price:price,
      location:location,
      country:country,
      geometry:{
       type:coordinate.type,
       coordinates:coordinate.coordinates
      },
    catagory:catagory
    
    })
    console.log(newList)
    req.flash("success","Listing created successfully!")
    newList.owner=req.user._id;
    await newList.save();
    console.log(newList.owner);
    res.redirect("/listing");
    
  }

module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    let list=await lists.findById(id);
    res.render('./listing/edit.ejs',{list})
  }

module.exports.updateListing=async (req, res) => {
    if(!req.body){
      throw new expressError(400,"Please send data for listing")
    }
    let {id}=req.params;
    let listx= await lists.findById(id);
   let listing= await lists.findByIdAndUpdate(id, { ...req.body.listing  },{runValidators:true});

    listing.catagory=req.body.catagory;
   
    console.log(listing.catagory);
    if(typeof req.file!=="undefined"){
      let imageUrl=req.file.path;
      let filename=req.file.filename;
      listing.image.url=imageUrl;
      listing.image.filename=filename;
      await listing.save();
    }
   req.flash("success","Listing updated successfully!")
    res.redirect(`/listing/${id}`);
  }

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    await lists.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully!")
    res.redirect("/listing");
  }

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    let listx= await lists.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

    let response=await geocodingClient.forwardGeocode({
      query: listx.location,
      limit: 1
    })
      .send()
  
    let coordinate=response.body.features[0].geometry
    console.log(response.body.features[0].geometry) ;

    listx.geometry.type=coordinate.type;
    listx.geometry.coordinates=coordinate.coordinates;
    console.log(listx.geometry.type);
    await listx.save();

    if(!listx){
      req.flash("error","Listing does not exist!");
      res.redirect("/listing");
    }
    res.render('./listing/showlist.ejs',{listx});
  }