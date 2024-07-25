/***********************************************************
 * ********************AUTH ROUTES**************************
 * *********************************************************/

const authController = require("../controllers/auth.controller");
const auth = require("../middlwares/auth.mw")


module.exports = (app) => {
  app.post("/ecomm/api/v1/auth/signup", [auth.verifySignupBody], authController.signup);
  app.post("/ecomm/api/v1/auth/login", [auth.verifyLoginBody], authController.login);
};




