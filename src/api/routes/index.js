const express = require('express');
const router  = express.Router(); 
const dishwasherController = require('../controllers/dishwasher'); 
const trashController = require('../controllers/trash')
const groceryController = require('../controllers/grocery')

// Dishwasher
router.get('/washer/status', dishwasherController.getWasherStatus)
router.post('/washer/update', dishwasherController.updateWasherStatus); 

// Trash
router.get('/trash/collectors', trashController.getCollectors)
router.get('/trash/collector', trashController.getCollector)
router.get('/trash/count', trashController.getCount)
router.post('/trash/collector', trashController.updateCollector)
router.get('/trash/notify', trashController.notifyCollector)

// Grocery
router.get('/grocery', groceryController.getItems)
router.post('/grocery', groceryController.insertItem)
router.delete('/grocery', groceryController.deleteItem)

module.exports = router;