const express = require("express");
const router = express.Router();
const { loginAdmin, getUsers, changePlan, changeQuota, getLogs, getRequests } = require("../controllers/adminController");
const validateAdminPlanRequest = require("../middlewares/validateAdminPlanRequest");
const validateAdminQuotaRequest = require("../middlewares/validateAdminQuotaRequest");
const validateAdminLoginRequest = require("../middlewares/validateAdminLoginRequest");
const validateAdminRequestsRequest = require("../middlewares/validateAdminRequestsRequest");
const validateKey = require("../middlewares/validateKey");
const validateAdminUsersRequest = require("../middlewares/validateAdminUsersRequest")
const validateAdminLogsRequest = require("../middlewares/validateAdminLogsRequest");
const { route } = require("./imageRoutes");

router.post("/usuaris/login", validateAdminLoginRequest, loginAdmin);
router.get("/usuaris",validateKey,validateAdminUsersRequest,getUsers)
router.post("/usuaris/plan",validateKey,validateAdminPlanRequest,changePlan)
router.post("/usuaris/quota",validateKey,validateAdminQuotaRequest,changeQuota)
router.post("/logs/list",validateKey,validateAdminLogsRequest,getLogs)
router.get("/requests/list",validateKey,validateAdminRequestsRequest,getRequests)

module.exports = router;
