const express = require("express");
const router = express.Router();
const { loginAdmin, getUsers, changePlan } = require("../controllers/adminController");
const validateAdminPlanRequest = require("../middlewares/validateAdminPlanRequest");
const validateAdminLoginRequest = require("../middlewares/validateAdminLoginRequest");
const validateKey = require("../middlewares/validateKey");
const validateAdminUsersRequest = require("../middlewares/validateAdminUsersRequest")

router.post("/usuaris/login", validateAdminLoginRequest, loginAdmin);
router.get("/usuaris",validateKey,validateAdminUsersRequest,getUsers)
router.post("/usuaris/plan",validateKey,validateAdminPlanRequest,changePlan)

module.exports = router;
