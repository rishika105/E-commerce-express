/***********************************************************
 * ********************CATEGORY ROUTES**********************
 * *********************************************************/

const category_controller = require("../controllers/category.controller")
const auth = require("../middlwares/auth.mw")


module.exports = (app) => {
    app.post("/ecomm/api/v1/categories", [auth.verifyToken,auth.isAdmin], category_controller.createNewCategory)
    app.put("/ecomm/api/v1/categories/updateCategory/:id", [auth.verifyToken,auth.isAdmin], category_controller.updateCategory)
}