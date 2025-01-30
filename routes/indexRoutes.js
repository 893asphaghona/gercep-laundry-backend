const express = require("express");
const { route } = require("./userRoutes");
const router = express.Router();

//router untuk home
router.get("/home", (req, res) => {
    res.json({message: "selama datang di halaman home"});
});

//router untuk about
router.get("/about", (req, res) => {
    res.json({message: "selama datang di halaman about"});
});

//router untuk about
router.get("/services", (req, res) => {
    res.json({message: "selama datang di halaman services"});
});

module.exp