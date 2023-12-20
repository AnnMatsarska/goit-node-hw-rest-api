const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

// --signup

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
