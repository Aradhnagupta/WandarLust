if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}



const express =require("express");
const app=express();
const mongoose=require("mongoose");
const path = require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate") 
const expressError=require("./utils/expressError");
const session =require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js")
const multer=require("multer");


const dbURL= process.env.ATLASDB_URL;

const listingRoute=require("./Router/listingRoute.js");
const reviewRoute=require("./Router/reviewRoute.js")
const userRoute=require("./Router/userRoute.js")

app.set('view engine',"ejs");
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

console.log(dbURL);
const store= MongoStore.create({
  mongoUrl: dbURL, 
  crypto: {
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
})

store.on("error",(err)=>{
console.log("error in store",err);
  })


const sessionOption={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
};



app.use(session(sessionOption));  //middleware for to send signed cookies for any session
app.use(flash()); //use flash before routes

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//passport user ko serialize and deserialize bhi karta h means ek session ki information ko store bkarana is serialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//res.local middleware
app.use((req,res,next)=>{
res.locals.success=req.flash("success");
res.locals.error=req.flash("error");
res.locals.currUser=req.user;
next();
})

app.use("/listing" ,listingRoute);
app.use("/listing/review" ,reviewRoute);
app.use("/" ,userRoute);

main()
.then(()=>{
  console.log("connected to server")
})
.catch((err) => {
    console.log(err)
});


async function main() {
  await mongoose.connect(dbURL); 
}

//page not found
app.all("*",(req,res,next)=>{
 next(new expressError(404,"Page not found"))
})

//error middelware
app.use((err,req,res,next)=>{
  let {status=500,message="Some Error Occured"}=err;
  res.render("./listing/error.ejs",{message});
  // res.status(status).send(message);
})

app.listen(8080,()=>{
  console.log("server is listening on port 8080");
})

