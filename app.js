const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes-take-2');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const Post = mongoose.model('Post', {
    title: String,
    showTitle: String
});

// let posts = [
//     { title: "My Favorite Show, Currently", showTitle: "The Americans" },
//     { title: "Must Watch Show", showTitle: "Ray Donovan" }
// ];

app.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.render('posts-index', { posts: posts });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/', (req, res) => {
    res.render('posts-index', { posts: posts });
});

app.listen(3000, () => {
    console.log('App listening on port 3000 :)')
});
