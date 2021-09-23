const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes')
 
const app = express();
app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended: true}))

// Connect to the database
const databaseURL = 'mongodb+srv://harshpatel:Harsh@9026@cluster0.r1zsr.mongodb.net/RandomBlogs?retryWrites=true&w=majority'
mongoose.connect(databaseURL, { useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => {app.listen(3000)})
    .catch((err) => {console.log(err)})
    

app.get('/' , (req , res) => {
    res.redirect('/blogs');
})

app.get('/about' , (req , res) => {
    res.render('about' , {title : 'About'});
})

app.use(blogRouter)

app.use((req , res) => {
    res.status(404).render('error' , { title : '404'});
})