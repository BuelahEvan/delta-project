//for custom errors
class ExpressError extends Error{
    constructor(statusCode,message){
        super();
       this.statusCode =statusCode;
       this.message = message;
        
    }
}

module.exports =ExpressError //here we are exporting expresserror to module

//means you’re exporting the ExpressError class or function from the current file so that it can be imported (required) in another module.