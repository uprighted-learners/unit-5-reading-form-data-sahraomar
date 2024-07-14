const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

//Create variables to store the words users will input
let noun, verb, adjective, adverb, place;

//Middleware to help process form data
app.use(express.urlencoded({ extended: true }));

// serve the static files from 'public' folder
app.use(express.static("public"));

//Define routes to handle different web pages and forms. Each route corresponds to a step in the Madlibs game

app.get("/first-word", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "first-word.html"));
});

app.post("/second-word", (req, res) => {
  noun = req.body.noun;
  res.sendFile(path.join(__dirname, "public", "second-word.html"));
});

app.post("/third-word", (req, res) => {
  verb = req.body.verb;
  res.sendFile(path.join(__dirname, "public", "third-word.html"));
});

app.post("/fourth-word", (req, res) => {
  adjective = req.body.adjective;
  res.sendFile(path.join(__dirname, "public", "fourth-word.html"));
});
app.post("/fifth-word", (req, res) => {
  adverb = req.body.adverb;
  res.sendFile(path.join(__dirname, "public", "fifth-word.html"));
});
//handle submission for place and redirect story
app.post("/done", (req, res) => {
  place = req.body.place;
  res.redirect("/story");
});
//serve the final story
app.get("/story", (req, res) => {
  // route path here
  const story = `Once upon a time, in a ${place}, there was a ${noun} who loved to ${verb}. The ${noun} was very ${adjective} and did everything ${adverb}.`;
  res.send(
    `<h1>Your Story</h1><p>${story}</p><button onclick="location.href='/reset'">Reset</button>`
  );
});

//reset story

app.get(`reset`, (req, res) => {
  noun = verb = adjective = adverb = place = "";
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
