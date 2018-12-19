const express = require('express');
const app = express();
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let posts = [
    { title: "My Favorite Show, Currently", showTitle: "The Americans" },
    { title: "Must Watch Show", showTitle: "Ray Donovan" }
];

app.get('/', (req, res) => {
    res.render('posts-index', { posts: posts });
});

app.listen(3000, () => {
    console.log('App listening on port 3000 :)')
});
