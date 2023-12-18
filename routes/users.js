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
          CVV: String,
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

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  console.log("body is OK");

  User.findOne({ email: req.body.email }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      return res.json({
        result: true,
        token: data.token,
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
      });
    } else {
      return res.json({
        result: false,
        error: "User not found or wrong password",
      });
    }
  });
});

// ----------------- :/userToken ----------------

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

router.post("/:userToken/saveTrip/:tripIndex", async (req, res) => {
  const { userToken, savedTrip } = await saveTrip(req);

  const updateResult = await User.updateOne(
    { token: userToken },
    { $push: { savedTrips: savedTrip._id } }
  );
  return res.json({ savedTrip, updateResult });
});

router.post("/:userToken/reserveTrip/:tripIndex", async (req, res) => {
  const { userToken, savedTrip } = await saveTrip(req);

  const updateResult = await User.updateOne(
    { token: userToken },
    { $push: { reservedTrips: savedTrip._id } }
  );
  return res.json({ savedTrip, updateResult });
});

// addPaymentInfo

router.post("/:userToken/addPaiyementInfo", async (req, res) => {
  try {
    const user = await User.findById(userToken);

    const userToken = req.params.userToken;
    const { nameOnCard, cardNumber, expiryDate, code } = req.body;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    user.bankCardInfo.nameOnCard = nameOnCard;
    user.bankCardInfo.cardNumber = cardNumber;
    user.bankCardInfo.expiryDate = new Date(expiryDate);
    user.bankCardInfo.code = code;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Informations de paiement enregistrées avec succès",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'enregistrement des informations de paiement",
    });
  }
});

module.exports = router;
