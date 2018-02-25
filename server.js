const express = require('express');
var app = express();
var hbs = require('hbs');
var fs = require('fs');
const port = process.env.PORT || 3000 ;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to save log to file');
        }
    });
    next();
});

// app.use((req,res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
   return new Date().getFullYear()
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'home page',
        welcomeMsg: 'Welcome To Our Web site'
    })
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});
app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'Unable to navigate to page'
   }) ;
});
app.listen(port);