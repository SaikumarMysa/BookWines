const fs = require('fs');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const Book = require('./../models/bookModel');
;
const User = require('./../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
   /*  useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false */
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const books = JSON.parse(

  fs.readFileSync(`${__dirname}/books.json`, 'utf-8')

);
// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
// );


// IMPORT DATA INTO DB
const importData = async () => {

  try {

     await Book.create(books);
    //await User.create(users);

    console.log('Data successfully loaded!');

  } catch (err) {
    console.log(err);
  }

  process.exit();

};

// DELETE ALL DATA FROM DB
const deleteData = async () => {

  try {

    await Book.deleteMany();
    //await User.deleteMany();

    console.log('Data successfully deleted!');

  } catch (err) {

    console.log(err);
  }

  process.exit();

};

if (process.argv[2] === '--import') {

  importData();

} else if (process.argv[2] === '--delete') {

  deleteData();

}
// node ./dev-data/import-dev.js --delete
// node ./dev-data/import-dev.js --import