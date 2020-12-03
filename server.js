const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the web server side...");
});

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
