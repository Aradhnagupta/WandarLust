const User= require("../models/user.js");


module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    //here we are using try and catch coz we dont want that is user already exist so it go to error page we jast want that is flash the error and redirect to signup page thats why we are using here try and catch alag so it can flash error
    try{
        let {username,email,password}=req.body;
        const newUser=new User({username,email});
        const registeredUser=await User.register(newUser,password);
        console.log(newUser);
        console.log(registeredUser);
        //autometically login
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WondarLand!")
            res.redirect("/listing");
        })
       
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

}

module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async (req, res) => {
    console.log(req);
    req.flash("success", "Welcome to Wonderland!");
    if(!res.locals.redirectUrl){
       return res.redirect("/listing");
    }
    console.log(res.locals.redirectUrl);
    res.redirect(res.locals.redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","user logged out successfully");
res.redirect("/listing");
} 
)

}