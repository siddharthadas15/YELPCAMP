var Campground=require("../models/campground");
var Comment=require("../models/comment");

var middlewareObj={};

middlewareObj.isLoggedin=function (req,res,next)
{
 if(req.isAuthenticated())   
 {
     return next();
 }
 req.flash("error","You Must Be Logged In First");
 res.redirect("/login");
};
middlewareObj.checkCampgroundOwnership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,function(err, fcamp) {
           if(err)
           {
                req.flash("error","Campground Not Found");
           res.redirect("back");
           }
           else
           {
               if(fcamp.author.id.equals(req.user._id))
               {
                   next();
               }
               else
               {
                    req.flash("error","You Don't Permission To Do That!");
                 res.redirect("back");
               }
           }
        });
    }
    else
    {
         req.flash("error","You Must Be Logged In First");
        res.redirect("back");
    }
    
};
middlewareObj.checkCommentOwnership=function (req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err,fcom) {
           if(err)
           {
                req.flash("error","Campground Not Found");
           res.redirect("back");
           }
           else
           {
               if(fcom.author.id.equals(req.user._id))
               {
                   next();
               }
               else
               {
                     req.flash("error","You Don't Permission To Do That!");
               res.redirect("back");
               }
           }
        });
    }
    else
    {
         req.flash("error","You Must Be Logged In First");
        res.redirect("back");
    }
};

module.exports=middlewareObj;