const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes-take-2');
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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


app.post('/posts', (req, res) => {
    Post.create(req.body).then((post) => {
        console.log(post);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    });
});


app.listen(3000, () => {
    console.log('App listening on port 3000 :)')
});
