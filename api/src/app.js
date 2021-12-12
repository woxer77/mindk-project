const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.send("The connection to the 127.0.0.1:" + process.env.APP_PORT + " was successfully created");
});

app.get("/get", function (req, res) {
    res.send("An example of a get request when accessing a page /get");
});

app.listen(process.env.APP_PORT);