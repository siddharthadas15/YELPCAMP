if (process.env.NODE_ENV !== "production") {
   require('dotenv').config();
}

var express=require("express"),
passport=require("passport"),
flash=require("connect-flash"),
methodOverride=require("method-override"),
LocalStrategy =require("passport-local");
var app=express();
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
var bparser=require("body-parser");
var User =require("./models/user");
var mongoose=require("mongoose");
var session=require('express-session');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbUrl);
var Campground=require("./models/campground"),
Comment=require("./models/comment");
var seedDB=require("./seed");
//seedDB();//seed the database
const MongoDBStore = require('connect-mongo')(session);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

const secret=process.env.SECRET||"SD15's encode and decode mesaage";
const store = new MongoDBStore({
   url: dbUrl,
   secret,
   touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
   console.log("SESSION STORE ERROR", e)
});
app.use(session({
   store,
    secret,
    resave:false,
    saveUninitialized:false,
    cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






var commentRoutes=require("./routes/campground"),
     campgroundRoutes=require("./routes/comment"),
     indexRoutes=require("./routes/index");






//==================================
//PASSPORT CONFIG
//==================================

//=====================================
app.use(function(req, res, next)
{
   res.app.locals.currentUser=req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   
  // console.log(req.user);
   next();
});
//=====================================
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


const port = process.env.PORT || 3000;
app.listen(port,function()
{
   console.log("SD15 sever started"); 
});