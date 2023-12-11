var express = require("express");
var router = express.Router();
const uid2 = require("uid2");
const User = require("../database/models/users");
const { checkBody } = require("../modules/checkbody");
const { saveTrip } = require("../modules/saveTrip");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  //console
  if (!checkBody(req.body, ["email", "password", "firstname", "lastname"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  console.log("body is OK");

  User.findOne({ email: req.body.email }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        savedTrips: [],
        reservedTrips: [],
        bankCard: {
          cardNumber: "",
          expiryDate: new Date("9999-12-31T23:59:59"),
          code: "",
        },
      });

      newUser.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.get("/signin/:email/:password", (req, res) => {
  if (!checkBody(req.params, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  console.log("params are OK");

  User.findOne({ email: req.params.email }).then((data) => {
    if (data && bcrypt.compareSync(req.params.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

// ----------------- :/userToken ----------------

// async function saveTrip(req) {
//   const selectedTripIndex = Number(req.params.tripIndex);
//   const userToken = req.params.userToken;

//   const newTrip = new Trip(trips[selectedTripIndex]);
//   const savedTrip = await newTrip.save();
//   return { userToken, savedTrip };
// }

router.get("/:userToken/reservedTrips", (req, res) => {
  const token = req.params.userToken;
  User.findOne({ token })
    .populate("reservedTrips")
    .then((data) => {
      return res.json(data.reservedTrips);
    });
});

router.get("/:userToken/savedTrips", (req, res) => {
  const token = req.params.userToken;
  User.findOne({ token })
    .populate("savedTrips")
    .then((data) => {
      return res.json(data.savedTrips);
    });
});

router.post("/:userToken/trips/saveTrips/:tripIndex", async (req, res) => {
  const { userToken, savedTrip } = await saveTrip(req);

  const updateResult = await User.updateOne(
    { token: userToken },
    { $push: { savedTrips: savedTrip._id } }
  );
  return res.json({ savedTrip, updateResult });
});

router.post("/:userToken/trips/reserveTrips/:tripIndex", async (req, res) => {
  const { userToken, savedTrip } = await saveTrip(req);

  const updateResult = await User.updateOne(
    { token: userToken },
    { $push: { reservedTrips: savedTrip._id } }
  );
  return res.json({ savedTrip, updateResult });
});

module.exports = router;
