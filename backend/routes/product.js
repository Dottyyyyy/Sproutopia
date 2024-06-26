const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../utils/multer');

const productController = require('../controllers/ProductController');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const isValid = FILE_TYPE_MAP[file.mimetype];
//         let uploadError = new Error('invalid image type');

//         if (isValid) {
//             uploadError = null;
//         }
//         cb(uploadError, 'public/uploads');
//     },
//     filename: function (req, file, cb) {
//         const fileName = file.originalname.split(' ').join('-');
//         const extension = FILE_TYPE_MAP[file.mimetype];
//         cb(null, `${fileName}-${Date.now()}.${extension}`);
//     }
// });

// const uploadOptions = multer({ storage: storage });

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/create', upload.array('images'), productController.createProduct);
router.put('/:id', upload.array('images'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/get/count', productController.getProductCount);
router.get('/get/featured/:count', productController.getFeaturedProducts);
router.put('/gallery-images/:id', upload.array('images'), productController.updateGalleryImages);

module.exports = router;