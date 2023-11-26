const express = require('express');
const router =  express.Router();
const {getshowsByCitiesandDates} = require('../controller/createClientController');
const {createClientMiddleware} = require('../middlewares/getCityMiddleware');

router.get('/shows', getshowsByCitiesandDates);
module.exports = router;

