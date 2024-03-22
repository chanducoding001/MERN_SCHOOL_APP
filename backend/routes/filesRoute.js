const express = require('express');
const multer = require('multer');
const { filesController,filesGetController, filesGetIdController,multipleFilesController, getMultipleFilesController } = require('../controllers/filesController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage,limits: { fileSize: 5 * 1024 * 1024 }, });

const router = express.Router();

router.post('/',upload.single('file'),filesController);
router.post('/multiple',upload.array('files'),multipleFilesController);
router.get('/',filesGetController);
router.get('/:id',filesGetIdController);
router.get('/multiple/:id',getMultipleFilesController)
module.exports = router;