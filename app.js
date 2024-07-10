const express = require('express');

const morgan = require('morgan');

const app = express();

const AppError = require('./utils/appError')

const globalErrorHandler = require('./controllers/errorController')

const userRouter = require('./routes/userRoutes');

const bookRouter = require('./routes/bookRoutes');
//Middlewares
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));
}

app.use(express.json());

app.use((req,res,next)=>{
    console.log('Hello from Middleware')
    next();
})
//routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/books', bookRouter);

app.all('*',(req,res,next)=>{
    next(new AppError(`cannot find ${req.originalUrl} on server!`,404) )
})

app.use(globalErrorHandler);

module.exports = app;