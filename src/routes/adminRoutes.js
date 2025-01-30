const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");
const validateAdminLoginRequest = require("../middlewares/validateAdminLoginRequest");

router.post("/usuaris/login", validateAdminLoginRequest, loginAdmin);

module.exports = router;
