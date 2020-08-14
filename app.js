var express=require("express"),
passport   =require("passport"),
flash      =require("connect-flash"),
methodOverride=require("method-override"),
LocalStrategy =require("passport-local");
var app=express();
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
var bparser=require("body-parser");
var User =require("./models/user");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
var Campground=require("./models/campground"),
Comment=require("./models/comment");
var seedDB=require("./seed");
//seedDB();//seed the database
app.use(bparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
    secret:"SD15's encode and decode mesaage",
    resave:false,
    saveUninitialized:false
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

app.listen(8080,function()
{
   console.log("SD15 sever started"); 
});