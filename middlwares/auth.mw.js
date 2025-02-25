//checks if the request body is proper and correct
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth_config = require("../config/auth.config");

const verifySignupBody = async (req, res, next) => {
  try {
    //check for the name
    if (!req.body.name) {
      return res.status(400).send({
        message: "Failed! Name was not provided",
      });
    }

    //check for the email
    if (!req.body.email) {
      return res.status(400).send({
        message: "Failed! Email not provided",
      });
    }

    //check for the userId
    if (!req.body.userId) {
      return res.status(400).send({
        message: "Failed! userId was not provided",
      });
    }

    //check if the user with the same userId is already present
    const user = await user_model.findOne({ userId: req.body.userId });

    if (user) {
      return res.status(400).send({
        message: "Failed! userId was already present",
      });
    }

    next();
  } catch (err) {
    console.log("Error while validating the request object");
    res.status(500).send({
      message: "Error while validating the request body",
    });
  }
};

const verifyLoginBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "userId is not present",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "password is not present",
    });
  }

  next();
};

const verifyToken = async (req, res, next) => {
  //check if the token is present in the header
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token found: Unauthorized",
    });
  }

  //token is valid
  jwt.verify(token, auth_config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Token is invalid",
      });
    }

    const user = await user_model.findOne({ userId: decoded.id });
    if (!user) {
      return res.status(400).send({
        message: "Unauthorized! The user for this token does not exist",
      });
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
   const user = req.user
   if(user && user.userType == "ADMIN"){
    next()
   }
   else{
    return res.status(403).send({
      message: "Only admin can create category!!!"
    })
   }
}


module.exports = {
  verifySignupBody: verifySignupBody,
  verifyLoginBody: verifyLoginBody,
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
