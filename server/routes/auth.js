const router = require("express").Router();
const authControllers = require("../controllers/auth");

router.post("/postUser", authControllers.postUser);
router.patch("/user/:userId", authControllers.postPrize);
router.post("/getUser", authControllers.getUser);
// router.post("/deleteUser", authControllers.deleteUser);
router.patch("/postPrize", authControllers.postPrize);
router.post("/postLatestPrize", authControllers.postLatestPrize);
router.get("/getPrizes", authControllers.getPrizes);

module.exports = router;
