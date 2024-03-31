const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const multer = require('multer');
const categoryController = require('../controllers/CategoryController')
// const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');


router.get('/', categoryController.getCategory );
router.post('/create', upload.array('images'), categoryController.createCategory );
router.delete('/:id', categoryController.deleteCategory );



module.exports = router;