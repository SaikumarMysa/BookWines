const AppError = require("../utils/appError");

const handleCastErrorDB=err=>{
    const message=`Invalid ${err.path}:${err.value}.`;
    return new AppError(message,400)
};
const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        stackTrace:err.stack,
        error:err, 
        message:err.message
})
}
const sendErrorProd=(err,res)=>{
    if(err.isOperational){
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,   
    })
 }
else{
    console.error('Error',err);
}
}

//Global Error handling middleware
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';
    if (process.env.NODE_ENV==='development') {
        sendErrorDev(err,res)
        }  
     else if (process.env.NODE_ENV==='production') {
        
        let error={...err};
        if (error.name==='CastError'){
            error= handleCastErrorDB(err);
        }
        sendErrorProd(res, error);  
        } 
    else{
        console.error('Error',err);
        res.status(500).json({
            status:'error',
            message:'something went very wrong'
        })  
    }
}