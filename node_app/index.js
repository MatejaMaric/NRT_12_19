const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

const port = 3000;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.render("home");
})

app.listen(port, () => console.log(`Server started on port ${port}.`));
