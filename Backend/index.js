"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv");
var db_1 = require("./config/db");
var user_route_1 = require("./routes/user.route");
var auth_routes_1 = require("./routes/auth.routes");
dotenv.config();
var app = express();
var PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_route_1.default);
db_1.default
    .sync()
    .then(function () {
    console.log("Database connected ✅");
    app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT, " \uD83D\uDE80")); });
})
    .catch(function (error) { return console.error("Database connection error:", error); });
