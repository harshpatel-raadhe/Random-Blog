const express = require('express');
const Blog = require('../models/blogs')

const router = express.Router();

router.get('/blogs/create' , (req , res) => {
    res.render('./create.ejs', {title : 'Create'});
})

router.get('/blogs' , (req , res) => {
    Blog.find()
    .then((result) => {
        res.render('./index.ejs', { title: 'All blogs' , blog : result })
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/blogs/:id' , (req , res) => {
    const id = req.params.id;
     
    Blog.findById(id)
    .then((result) => {
        res.render('./details.ejs' , { blog: result ,  title : 'Details'})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/blogs' , (req , res) => {
    const blog = new Blog(req.body)

    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err)
    })
})

router.delete('/blogs/:id' , (req , res) => {
   const id =  req.params.id;

   Blog.findByIdAndDelete(id)
   .then((result) => {
    res.json({ redirect : '/blogs'});
   })
   .catch((err) => {
       console.log(err)
   })
})

module.exports = router;