const express = require('express');
const { addBus, getAllBus, filterBus } = require('../controllers/busControllers');
const busRouter = express.Router();

busRouter.post("/bus", addBus);

busRouter.get("/bus", getAllBus);

busRouter.get("/bus/available/:seats", filterBus);

module.exports = busRouter;