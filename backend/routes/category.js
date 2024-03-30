const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const categoryController = require('../controllers/CategoryController')

router.get('/', categoryController.getCategory );
router.post('/create', categoryController.createCategory );
router.delete('/:id', categoryController.deleteCategory );

module.exports = router;