const express = require("express");
const {
    createRegisterUser,
    getUser,
    updateUser,
    deleteUser
} = require("../controller/userController");
const router = express.Router();

const {protect, authorize} = require("../middleware/protect");



router.route("/register").post(createRegisterUser);
router.route("/").get(getUser);
router.route("/:id").put(updateUser).delete(deleteUser);


module.exports = router;