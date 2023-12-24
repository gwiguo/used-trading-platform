const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const router = require('./router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));
// app.use(express.static(path.resolve(__dirname,"dist")));
app.use(cors());
app.use(router);


app.listen(3000, () => {
    console.log("服务器已启动并监听3000端口");
});