var express = require("express");
var router = express.Router();
const AccomodationSlot = require("../database/models/accommodation/accommodationSlots");
const AccomodationExtras = require("../database/models/accommodation/accommodationExtras");

router.get("/newAccomodation", (req, res) => {});

router.get("/getExtras", (req, res) => {
  AccomodationExtras.find().then((data) => {
    let result = data.filter((e) => e.name !== "example");

    return res.json(result);
  });
});

module.exports = router;
