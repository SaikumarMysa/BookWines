const express=require('express');
const morgan=require('morgan');
const app=express();
const bookRouter=require('./bookRoutes');
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));
}
app.use(express.json());
app.use((req,res,next)=>{
    console.log('Hello from Middleware')
    next();
})
app.use('/api/v1/books',bookRouter);
module.exports=app;