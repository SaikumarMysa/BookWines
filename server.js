const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const app = require('./app.js');

const fs = require('fs');

const Book = require('./models/bookModel.js');

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

//console.log('hii '+process.env.NODE_ENV);

mongoose
.connect(DB,{
})
.then(()=>
    console.log('DB connection successful')
)

const port=process.env.PORT||3002;

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
});


