const express = require('express');
const router  = express.Router(); 
const dishwasherController = require('../controllers/dishwasher'); 
const trashController = require('../controllers/trash')

// Dishwasher
router.get('/washer/status', dishwasherController.getWasherStatus)
router.post('/washer/update', dishwasherController.updateWasherStatus); 

// Trash
router.get('/trash/collectors', trashController.getCollectors)
router.get('/trash/collector', trashController.getCollector)
router.get('/trash/count', trashController.getCount)
router.post('/trash/collector', trashController.updateCollector)
router.get('/trash/notify', trashController.notifyCollector)

module.exports = router;