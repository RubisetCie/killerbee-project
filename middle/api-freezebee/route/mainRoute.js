/****************************************************************
 * The routes to perform the model operations.
 ****************************************************************/

const router = require("express").Router();
const controller = require("../controller/modelController");

router.get("/", controller.getAll);
router.get("/restaurant/:id", controller.getByRestaurantId);
router.get("/:id", controller.getById);

module.exports = router;
