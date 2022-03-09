const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");

// app.use(cors());
// app.options("*", cors());
app.use(express.static(path.join(__dirname, "templates")));

const animeImgs = fs.readdirSync(`${__dirname}/templates/imgs/anime`, "utf-8");
const natureImgs = fs.readdirSync(
  `${__dirname}/templates/imgs/nature`,
  "utf-8"
);
const carsImgs = fs.readdirSync(`${__dirname}/templates/imgs/cars`, "utf-8");
const randomImgs = fs.readdirSync(
  `${__dirname}/templates/imgs/random`,
  "utf-8"
);

const template = fs.readFileSync(
  `${__dirname}/templates/template.html`,
  "utf-8"
);

const markup = function (array, name) {
  return array
    .map((el) => {
      return `
    <div class="wallpaper">
    <div>
      <img
        class="wallpaper-img"
        src="/imgs/${name}/${el}"
        alt="Anime"
      />
    </div>
    <div class="download">
      <a href="/imgs/${name}/${el}" class="download" download=""
        >Download</a
      >
    </div>
  </div>`;
    })
    .join(" ");
};

const animeMarkup = markup(animeImgs, "anime");
const carsMarkup = markup(carsImgs, "cars");
const natureMarkup = markup(natureImgs, "nature");
const randomMarkup = markup(randomImgs, "random");

const animeOutput = template.replace("{%IMG%}", animeMarkup);
const randomOutput = template.replace("{%IMG%}", randomMarkup);
const carsOutput = template.replace("{%IMG%}", carsMarkup);
const natureOutput = template.replace("{%IMG%}", natureMarkup);

const animefinal = animeOutput;
const carsfinal = carsOutput;
const naturefinal = natureOutput;
const randomfinal = randomOutput;

app.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  res.end(animefinal);
});
app.get("/anime", (req, res) => {
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  res.end(animefinal);
});
app.get("/cars", (req, res) => {
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  res.end(carsfinal);
});
app.get("/nature", (req, res) => {
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  res.end(naturefinal);
});
app.get("/random", (req, res) => {
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  res.end(randomfinal);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("running", port);
});
