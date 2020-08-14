var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

router.get("/campground/:id/comments/new",middleware.isLoggedin,function(req,res)
{
    Campground.findById(req.params.id,function(err,fcamp)
    {
       if(err)
       console.log(err);
       else
        res.render("comment/new",{campground:fcamp}); 
    });
});
router.post("/campground/:id/comments",middleware.isLoggedin,function(req,res)
{
   Campground.findById(req.params.id,function(err,fcamp)
    {
       if(err)
       {
       console.log(err);
       res.redirect("/campground");
       }
       else
      {
         
          Comment.create(req.body.comment,function(err,nco)
          {
             if(err)
             console.log(err);
             else{
                 nco.author.id=req.user._id;
                 nco.author.username=req.user.username;
                 nco.save();
                 fcamp.comments.push(nco);
                 fcamp.save(function(err,cc)
                 {
                    if(err)
                    console.log(err);
                    else
                    {
                        res.redirect("/campground/"+cc._id);
                    }
                 });
             }
          });
      }
    });   
});


router.get("/campground/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res)
{
   Comment.findById(req.params.comment_id,function(err,fcom)
   {
      if(err)
     res.redirect("back");
     else
     {
         res.render("comment/edit",{campground_id:req.params.id,comment:fcom});
     }
      
   });
});

router.put("/campground/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res)
{
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,upc)
   {
      if(err)
      {
         res.redirect("back"); 
      }
      else
      {
          res.redirect("/campground/"+req.params.id);
      }
   }); 
});

router.delete("/campground/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res)
{
   Comment.findByIdAndRemove(req.params.comment_id,function(err)
   {
      if(err)
      res.redirect("back");
      else
      {
          res.redirect("/campground/"+req.params.id);
      }
   });
});

module.exports=router;