const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../config/auth.config")

exports.signup = async (req, res) => {
  //logic to create the user

  //read the request body
  const user = req.body;

  //insert the data in the users collection in MongoDb
  const userObj = {
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    password: bcrypt.hashSync(user.password, 8),
  };

  try {
    const user_created = await user_model.create(userObj);

    //return this response without password
    const req_obj = {
      name: user_created.name,
      userId: user_created.userId,
      email: user_created.email,
      userType: user_created.userType,
      createdAt: user_created.createdAt,
      updatedAt: user_created.updatedAt,
    };

    //return this created user as response
    res.status(201).send(req_obj);
  } catch (err) {
    console.log("Error while registering the user", err);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {

  //check if the user id is present in the system
  const user = await user_model.findOne({ userId: req.body.userId });

  if (!user) {
    return res.status(400).send({
      message: "User id passed is not a valid user id",
    });
  }

  //password is correct
  //in db we have hashed password
  //in order to compare hash that password from user
  //using this bcrypt func
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  //return if wrong
  if (!isPasswordValid) {
    return res.status(401).send({
      message: "Password is incorrect!",
    });
  }

  //create access with a given TTL and return token using jwt
  const token = jwt.sign({ id: user.userId }, secret.secret, {
    expiresIn: 24*60*60, //seconds
  });
  //TTL -> time to leave -> expiry time

  //return response
  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    accesstoken: token
  })


};
