const express = require('express');
const methodOverride = require('method-override');
const app = express();
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes-take-2');
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'));

const Post = mongoose.model('Post', {
    title: String,
    showTitle: String,
    description: String
});


app.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.render('posts-index', { posts: posts });
        })
        .catch(err => {
            console.log(err);
        });
});


app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
});


app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).then((post) => {
        res.render('posts-show', { post: post })
    }).catch((err) => {
        console.log(err.message)
    })
});


app.post('/posts', (req, res) => {
    Post.create(req.body).then((post) => {
        console.log(post);
        res.redirect(`/posts/${post._id}`);
    }).catch((err) => {
        console.log(err.message);
    });
});


app.get('/posts/:id/edit', (req, res) => {
    Post.findById(req.params.id, function(err, post) {
        res.render('posts-edit', { post: post });
    });
});


app.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(post => {
            res.redirect(`/posts/${post._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
});


app.listen(3000, () => {
    console.log('App listening on port 3000 :)')
});
