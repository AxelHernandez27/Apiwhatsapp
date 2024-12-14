const express = require("express");
const router = express.Router();
const apicontroller = require("../controller/apiController");

router
.get("/",apicontroller.verificar)
.post("/", apicontroller.recibir)

module.exports = router;