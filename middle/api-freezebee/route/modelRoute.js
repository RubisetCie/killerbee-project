/****************************************************************
 * The routes to perform the model operations.
 ****************************************************************/

const router = require("express").Router();
const controller = require("../controller/modelController");

router.post("/", controller.post);
router.get("/", controller.get);
router.get("/:id", controller.getById);
router.get("/:name", controller.getByName);
router.put("/:id", controller.putById);
router.delete("/:id", controller.deleteById);

module.exports = router;
