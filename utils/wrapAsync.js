// function wrapAsync(fn){
//     return function(req,res,next){
//       fn(req,res,next).catch(next);
//     }
// }

//same above code we are changing into below code  to directly require in app.js

module.exports =(fn) =>{
    return (req,res,next)=>{
      fn(req,res,next).catch(next);
    }
}