const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
/*
app.get("/", (req, res) => {
  res.send("Hello from the web server side...");
});
*/

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/submission", (req, res) => {
  console.log(req.body.submission);
  res.send(req.body.submission); //what if I wanted this to take me to a different page on my site?
  fs.appendFileSync(
    "log.JSON",
    JSON.stringify({ userSubmission: `${req.body.submission}` })
  );
});

app.use(express.static(path.join(__dirname, "../public")));

//Experiment I did to try to understand things better.
app.get("/fake", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/fakeindex.html"));
});

//it makes me download the file, lol. I thought it would display it. I'm happy with this for now!
app.get("/formsubmission", (req, res) => {
  res.send(fs.readFileSync("log.JSON"));
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
