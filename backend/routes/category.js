const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const multer = require('multer');
const categoryController = require('../controllers/CategoryController')
// const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');


router.get('/', categoryController.getCategory );
router.get('/:id', categoryController.getCategoryId );

router.post('/create', upload.array('images'), categoryController.createCategory );
router.delete('/:id', categoryController.deleteCategory );
router.put('/:id', upload.array('images'), categoryController.updateCategory )


module.exports = router;