const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

//Define dir path for the express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

//set up static directory for express engine
app.use(express.static(publicDirPath));

//set up handlebars engine and views location
app.set("view engine", "hbs");
//setting up custom views path for hbs
app.set("views", viewsDirPath);
//set up partials dir to hbs engine
hbs.registerPartials(partialsDirPath);

//routing and rendering dynamic content (hbs files)
app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Nikita Patil",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Nikita P",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Nikitaa",
    message: "This is a weather forecast application",
  });
});

//hardcoded home page
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send({
//     nae: "nikita",
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1> About</h1> ");
// });
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide the address" });
  }
  // res.send({
  //   location: "dubai",
  //   forecast: "24 degree",
  // });
  const address = req.query.address;
  geocode(address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(data, (error, forecastdata) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        location: data.location,
        forecast: forecastdata,
      });
      console.log(data.location);
      console.log(forecastdata);
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: "new",
  });
});

// for error handling - like 404 not found

//for any specific route pattern
app.get("/help/*splat", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Nikitaa",
    errorMessage: "Help article not found",
  });
});

// must be at the end of all the other routes
app.get("/*splat", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Nikitaa",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
