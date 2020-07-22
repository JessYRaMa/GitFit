let exphbs = require ("express-handlebars");
let PORT = process.env.PORT || 3000;
let express = require("express");
let app = express();

app.engine('handlebars', exphbs({defaultLayout: 'index.handlebars'}));
app.set('view engine', 'handlebars');

app.get('/', function(error, data){
    data.render('index.handlebars');
});

app.listen(PORT);