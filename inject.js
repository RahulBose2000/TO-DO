//this is a demo data that are inserted to our database
const mongoose = require("mongoose");
const addTODO = require("./model/schema");

mongoose
  .connect("mongodb://localhost:27017/TODO")
  .then(() => {
    console.log("It connected");
  })
  .catch((err) => console.log("something went wrong"));


  const inject = [
    {
        purpose:'Have a meeting with the client',
        day:21,
        month:5,
        year:2022,
        status:'Pending'
    },
    {
        purpose:'Reading books',
        day:2,
        month:5,
        year:2022,
        status:'Success'
    }
  ];
  addTODO.insertMany(inject)
.then(res=>console.log(res))
.catch(err=>console.log(err))