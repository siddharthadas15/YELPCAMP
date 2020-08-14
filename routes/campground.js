var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");
router.get("/campground",function(req,res)
{
    Campground.find({},function(err,campground)
{
    if(err)
    console.log(err);
    else
    {
      //  console.log(req.user);
        res.render("campground/index",{campground:campground,currentUser:req.user});
    }
});
  
      // 
});
router.post("/campground", middleware.isLoggedin ,function(req,res){
  var name =req.body.name;
  var image=req.body.image;
  var desc=req.body.description;
  var author={
      id:req.user._id,
      username:req.user.username
  };
  var newc={name:name,image:image,description:desc,author:author};
 Campground.create(newc,function(err,campgroundnew)
{
    if(err)
    console.log(err);
    else
    {
        console.log(campgroundnew);
         res.redirect("/campground");
    }
});
});
router.get("/campground/new", middleware.isLoggedin,function(req, res) {
   res.render("campground/form"); 
});

router.get("/campground/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcg)
    {
       if(err)
       console.log(err);
       else
       {
          // console.log(foundcg);
           res.render("campground/show",{campground:foundcg});
       }
    });
   
});
router.get("/campground/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id,function(err,fcamp)
    {
      if(err)
      console.log(err);
      else
      res.render("campground/edit",{campground:fcamp});
    });
  // res.render("edit");
});
router.put("/campground/:id",middleware.checkCampgroundOwnership,function(req,res)
{
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,fcamp) {
      if(err)
      res.redirect("/campground");
      else
      {
          res.redirect("/campground/"+req.params.id);
      }
   });
});
router.delete("/campground/:id",middleware.checkCampgroundOwnership,function(req,res)
{
   Campground.findByIdAndRemove(req.params.id,function(err)
   {
       if(err)
       res.redirect("/campground");
       else
       {
           req.flash("success","Campground Deleted Successfully!");
         res.redirect("/campground");
       }
   }) ;
});



module.exports=router;