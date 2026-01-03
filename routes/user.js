// const express=require("express");
// const user = require("../models/user");
// const router =express.Router();
// const User =require("../models/user.js");
// const wrapAsync = require("../utils/wrapAsync.js");
// const passport=require("passport");
// const { saveRedirectUrl } = require("../middleware.js");

// const userController = require("../controllers/user.js");

// router.get("/signup",(req,res)=>{
//     // res.send("form");
//     res.render("users/signup.ejs");
// });

// router.get("/signup",userController.renderSignupForm);

// router.post("/signup",wrapAsync(async(req,res)=>{
//     try{
//     let {username,email,password}=req.body;
//     const newUser = new User({email,username});
//     const registeredUser =await User.register(newUser,password);
//     console.log(registeredUser);
//     req.login(registeredUser,(err)=>{
//         if(err){
//             return next(err);
//         }
//     req.flash("success","Welcome to Wanderlust");
//     res.redirect("/listings");
//     });             //https://www.passportjs.org/concepts/authentication/login/
 
//     }
//     catch(e){
//         req.flash("error",e.message);
//         res.redirect("/signup");
//     }
//   })
// );

// router.post("/signup",wrapAsync(userController.signup));

// router.get("/login",(req,res)=>{
//   res.render("users/login.ejs")
// });
// router.get("/login",userController.renderLoginForm);

// router.post("/login",saveRedirectUrl,
//     passport.authenticate('local', {
//          failureRedirect: '/login' ,
//          failureFlash:true}),
//          async(req,res)=>{
//        req.flash("success","Welcome back to Wanderlust!");
//     //    res.redirect(req.session.redirectUrl); this wont work
//     let redirectUrl = res.locals.redirectUrl || "listings"
//     //  res.redirect(req.locals.redirectUrl);
//      res.redirect(redirectUrl);
// });

// router.post("/login",saveRedirectUrl,
//     passport.authenticate('local', {
//          failureRedirect: '/login' ,
//          failureFlash:true}),
//          userController.login
// );

// router.get("/logout",(req,res,next)=>{
//     req.logout((err)=>{
//         if(err){
//             return next(err);
//         }
//         req.flash("success","you are logged out!");
//         res.redirect("/listings");
//     });
// });

// router.get("/logout",userController.logout);

// module.exports =router;

//router.route and controllers

// const express=require("express");
// const user = require("../models/user");
// const router =express.Router();
// const User =require("../models/user.js");
// const wrapAsync = require("../utils/wrapAsync.js");
// const passport=require("passport");
// const { saveRedirectUrl } = require("../middleware.js");

// const userController = require("../controllers/user.js");

// router
//    .route("/signup")
//    .get(userController.renderSignupForm)
//    .post(wrapAsync(userController.signup))

// // router.get("/signup",userController.renderSignupForm);
// // router.post("/signup",wrapAsync(userController.signup));

// router
//    .route("/login")
//    .get(userController.renderLoginForm)
//    .post(saveRedirectUrl,
//     passport.authenticate('local', {
//          failureRedirect: '/login' ,
//          failureFlash:true}),
//          userController.login
// )

// // router.get("/login",userController.renderLoginForm);

// // router.post("/login",saveRedirectUrl,
// //     passport.authenticate('local', {
// //          failureRedirect: '/login' ,
// //          failureFlash:true}),
// //          userController.login
// // );

// router.get("/logout",userController.logout);

// module.exports =router;




const express = require("express");
const router = express.Router();
const User = require("../models/user.js"); // Keep only this one
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
   .route("/signup")
   .get(userController.renderSignupForm)
   .post(wrapAsync(userController.signup));

router
   .route("/login")
   .get(userController.renderLoginForm)
   .post(
      saveRedirectUrl,
      passport.authenticate('local', {
         failureRedirect: '/login',
         failureFlash: true
      }),
      userController.login
   );

router.get("/logout", userController.logout);

module.exports = router;