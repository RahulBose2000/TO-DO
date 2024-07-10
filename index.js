const express = require('express');
const app = express();
const path = require('path');

const PORT = 5050;
app.set('views',path.join(__dirname,'views'));

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true})) //to handle post , patch req

const methodOverride=require('method-override');
app.use(methodOverride('_method'));

// requiring the product from model>schema
const TODO = require('./model/schema')
// Mongoose
const mongoose = require('mongoose');
//you need to have mongo db in your local computer
mongoose.connect('mongodb://localhost:27017/TODO')
.then(()=>{
    console.log("Connection Opened");
})
.catch(err=>console.log("Something went wrong")); 

const status = ['Pending','Success','Failed'];


app.get('/',(req,res)=>{
    
    res.render('home');
})
app.get('/shows',async (req,res)=>{
    const {day,month,year}=req.query
    if(day,month,year){
        const shows = await TODO.find({day,month,year})
        res.render('shows',{shows,day,month,year});
    }else{
    const shows = await TODO.find({});
    res.render('shows',{shows,day,month,year:'All--'});
    }
  
})

//creating new goals
app.get('/shows/new', (req,res)=>{
    res.render('new',{status});
})
app.post('/shows',async (req,res)=>{
    
    const newGoal =await new TODO(req.body);
    newGoal.save();
    
    res.redirect('/shows');

})

//details
app.get('/shows/:id',async(req,res)=>{
    const {id}=req.params;
    const work=await TODO.findById(id);
    
    res.render('details',{work});
    
})


//edit
app.get('/shows/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const goalEdit = await TODO.findById(id);
    res.render('edit',{goalEdit,status});

})


app.put('/shows/:id',async (req,res)=>{
    const {id} = req.params;
    const todo = await TODO.findByIdAndUpdate(id,req.body,{runValidators:true});
    res.redirect(`/shows/${todo._id}`);
})
app.delete('/shows/:id',async (req,res)=>{
    const {id} = req.params;
    const todo = await TODO.findByIdAndDelete(id,req.body,{runValidators:true});
    res.redirect(`/shows`);
})

app.listen(PORT,()=>{
    console.log("listening on port 5050");
})

