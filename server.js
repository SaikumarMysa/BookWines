const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=require('./app.js');
const fs=require('fs');
const Book=require('./bookModel');
dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose
.connect(DB,{
})
.then(()=>
    console.log('DB connection successful...')
)

const port=process.env.PORT||3002;
app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
});


