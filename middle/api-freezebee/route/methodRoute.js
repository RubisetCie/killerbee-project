/****************************************************************
 * The routes to perform the method operations.
 ****************************************************************/

const router = require("express").Router();
const controller = require("../controller/methodController");

router.post("/", controller.post);
router.get("/", controller.get);
router.get("/query", controller.getQuery);
router.get("/:id", controller.getById);
router.put("/:id", controller.putById);
router.delete("/:id", controller.deleteById);

module.exports = router;
