if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}
const port = process.env.PORT || 8080;
const express=require("express");
const MongoStore = require('connect-mongo'); 
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const Review =require("./models/review.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter=require("./routes/user.js");

const session =require("express-session");
const flash=require("connect-flash");

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const dbUrl=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect( dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL, // Ensure this env var is set on Render
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

const sessionOptions = {
    store: store, // <--- UNCOMMENT OR ADD THIS LINE
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize()); //to intialize passport for every req
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());        //copied these two lines from configure passport
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
app.use((req, res, next) => {
    console.log("Flash Success:", req.flash("success"));
    console.log("Flash Error:", req.flash("error"));
    next();
});

app.use("/listings",listingRouter);

app.use("/listings/:id/reviews",reviewRouter);   //parent root
app.use("/",userRouter);

app.all("/:path",(req,res,next)=>{  //.all and :path    “For every request to any route that doesn’t match earlier ones, run this function.”
    next( new ExpressError(404,"page not found"));//new creates a new error object from the ExpressError class so Express knows what error happened and can show the correct message and status code.
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err
    res.status(statusCode).render("error.ejs",{message});
});


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});