const express = require('express');
const { addParentController, getParentController } = require('../controllers/parentController');
const router = express.Router();

router.post('/addParent',addParentController);
router.get('/:email',getParentController);

module.exports = router;