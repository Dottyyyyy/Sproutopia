const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const userController = require('../controllers/UserController')

const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');

router.post('/register', upload.single('image'), userController.register)
router.post('/login', userController.login );
router.get('/logout', userController.Logout);
router.get('/profile', isAuthenticated, userController.Profile);

module.exports = router;