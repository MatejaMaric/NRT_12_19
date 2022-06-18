const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

const port = 3000;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

class Oglas {
  static pocetniId = 0;

  constructor(kategorija, datum_isteka, cena, tekst, oznaka, email) {
    this.id = Oglas.pocetniId++;
    this.kategorija = kategorija;
    this.datum_isteka = datum_isteka;
    this.cena = cena;
    this.tekst = tekst;
    this.oznaka = oznaka;
    this.email = email;
  }
}

let oglasi = [
  new Oglas("automobili", "2022-07-14", 3000, "Toyota Corrola", "Benzin", "pera@zdera.rs"),
  new Oglas("automobili", "2022-07-14", 2000, "Toyota Yaris", "Benzin", "mika@peric.rs"),
];

app.get("/", (req, res) => {
  res.render("home", { oglasi });
})

app.post("/", (req, res) => {
  const { kategorija, datum_isteka, cena, tekst, oznaka, email } = req.body;
  oglasi.push(new Oglas(kategorija, datum_isteka, cena, tekst, oznaka, email));
  res.redirect("/");
})

app.get("/izbrisi/:id", (req, res) => {
  oglasi = oglasi.filter(o => o.id !== Number(req.params.id));
  res.redirect("/");
});

app.get("/edituj/:id", (req, res) => {
  res.render("edituj", oglasi.find(o => o.id === Number(req.params.id)));
});

app.post("/edituj/:id", (req, res) => {
  const { kategorija, datum_isteka, cena, tekst, oznaka, email } = req.body;
  const oglas = oglasi.find(o => o.id === Number(req.params.id))

  oglas.kategorija = kategorija;
  oglas.datum_isteka = datum_isteka;
  oglas.cena = cena;
  oglas.tekst = tekst;
  oglas.oznaka = oznaka;
  oglas.email = email;

  res.redirect("/");
});

app.listen(port, () => console.log(`Server started on port ${port}.`));
