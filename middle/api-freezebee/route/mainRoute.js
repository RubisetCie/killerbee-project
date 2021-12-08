/****************************************************************
 * The routes to perform the main operations.
 ****************************************************************/

const router = require("express").Router();
const controller = require("../controller/mainController");

router.get("/", controller.getAll);
router.get("/restaurant/:id", controller.getByRestaurantId);
router.get("/:id", controller.getById);

module.exports = router;
