const express = require("express");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const app = express();
const fs = require("fs");
const test = require("./test.js");
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use((req, res, next) => {
  console.log(
    "Korisnik postoji? ",
    req.headers["authorization"] ? true : false
  );
  if (req.headers["authorization"]) {
    next();
    return false;
    //.send({ message: "Korisnik ne postoji" });
  }
  console.log("Time:", Date.now());
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World I Tanja i Simo!");
});

app.get("/test", (req, res) => {
  console.log("request", req.params, req.query);
  res.send("Hello Test!");
});

app.get("/test/:userID", (req, res) => {
  res.send("Hello Test! UserID is: " + req.params.userID);
});

app.post("/test", (req, res) => {
  console.log("request is here", req.body);
  res.send({ message: "Hello Test POST!" });
});

app.post("/test?search=figma&page=3", (req, res) => {
  console.log("request is here", req.body);
  res.send({ message: "Hello Test POST!" });
});

app.post("/:category/products", (req, res) => {
  console.log("request is here", req.headers);
  res.send({ message: "Hello Test POST!" });
});

app.post("/auth/login", (req, res) => {
  console.log("request is here", req.body, req.headers);
  // res.send({ message: "Login success" });
  // res.jsonp({ message: "Login success - json" });
  // res.urlencoded({ message: "Login success" });
  res.download("invoices/info.txt");

  // res.status(401).json({ error: "Korisnik nije ulogovan" });
  // res.err;
});

app.get("/read-document", (req, res, next) => {
  try {
    // fs.readFile("/file-does-not-exist", (err, data) => {
    //   if (err) {
    //     next(err); // Pass errors to Express.
    //   } else {
    //     res.status(err.status || 400);
    //     res.end();
    //   }
    console.log("testFunc", test(5));
    res.send({ id: 5 });
    // });
  } catch (err) {
    // console.log("err", err, err.status);
    //   res.status(err.status || 500);
    res.status(403).send({ error: err.message });
    //   // res.send({ error: err.localized }); // Pass errors to Express.
  }
});

app.post("/products/details", (req, res, next) => {
  console.log("request is here", req?.body?.productName);
  res.send({ message: "Hello Test POST!" });
  next();
});

app.listen(port, () => {
  console.log(`Semos API listening on port ${port}`);
});
