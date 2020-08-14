var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var data=[{name:"Shimla",
    image:"https://q-xx.bstatic.com/xdata/images/hotel/840x460/178853008.jpg?k=6fccff594145ccab4e720f696d58e05e4a43b5fc3c8006db7521f185d652aae3&o=",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at nisi ut libero semper varius eget non lorem. Curabitur ultrices mi id porta sagittis. Ut porta neque vel nunc porttitor, non pharetra mauris pellentesque. Donec bibendum posuere dolor, ut imperdiet tortor facilisis eu. Pellentesque erat metus, aliquet in libero sit amet, mollis commodo ante. Nullam dignissim neque massa, id tincidunt quam ornare sed. Nulla eu neque et lectus fringilla malesuada at et turpis. Morbi vitae nunc suscipit, faucibus eros sed, egestas lectus. Curabitur ornare elementum vestibulum. Curabitur nec commodo odio. Sed quis ipsum eu felis luctus lobortis. Aliquam in metus ut lectus varius mattis at at sem. Fusce fermentum felis sed elit pellentesque rutrum. Aliquam eget malesuada mauris, et condimentum urna."
},
{name:"Manali",
    image:"https://image.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at nisi ut libero semper varius eget non lorem. Curabitur ultrices mi id porta sagittis. Ut porta neque vel nunc porttitor, non pharetra mauris pellentesque. Donec bibendum posuere dolor, ut imperdiet tortor facilisis eu. Pellentesque erat metus, aliquet in libero sit amet, mollis commodo ante. Nullam dignissim neque massa, id tincidunt quam ornare sed. Nulla eu neque et lectus fringilla malesuada at et turpis. Morbi vitae nunc suscipit, faucibus eros sed, egestas lectus. Curabitur ornare elementum vestibulum. Curabitur nec commodo odio. Sed quis ipsum eu felis luctus lobortis. Aliquam in metus ut lectus varius mattis at at sem. Fusce fermentum felis sed elit pellentesque rutrum. Aliquam eget malesuada mauris, et condimentum urna."
},
{name:"Himalaya",
    image:"https://q-cf.bstatic.com/images/hotel/max1024x768/227/227871385.jpg",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at nisi ut libero semper varius eget non lorem. Curabitur ultrices mi id porta sagittis. Ut porta neque vel nunc porttitor, non pharetra mauris pellentesque. Donec bibendum posuere dolor, ut imperdiet tortor facilisis eu. Pellentesque erat metus, aliquet in libero sit amet, mollis commodo ante. Nullam dignissim neque massa, id tincidunt quam ornare sed. Nulla eu neque et lectus fringilla malesuada at et turpis. Morbi vitae nunc suscipit, faucibus eros sed, egestas lectus. Curabitur ornare elementum vestibulum. Curabitur nec commodo odio. Sed quis ipsum eu felis luctus lobortis. Aliquam in metus ut lectus varius mattis at at sem. Fusce fermentum felis sed elit pellentesque rutrum. Aliquam eget malesuada mauris, et condimentum urna."
}
    ];
function seedDB(){
    Campground.remove({},function(err,cp)
{
    
/*   if(err)
   console.log(err);
   else
   {
   console.log("Data Removed");
   for(var i=0;i<data.length;i++)
   {
       Campground.create(data[i],function(err,ndata)
       {
          if(err)
          console.log(err);
          else
          {
          console.log("Data Created!!");
          Comment.create({
              text:"Perfect Place To Feel the nature",
              author:"SD15"
          },function(err,comment)
          {
              if(err)
              console.log(err);
              else
              {
                  ndata.comments.push(comment);
                  ndata.save(function(err,data)
                  {
                     if(err)
                     console.log(err);
                     else
                     console.log("New Comment");
                  });
              }
          });
          }
       });
   }
   }*/
});
}
module.exports=seedDB;