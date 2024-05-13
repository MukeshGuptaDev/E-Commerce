import express from 'express'
import { registerController, loginController, testConteroller } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


//router object

const router = express.Router()
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//test Route
router.get('/test', requireSignIn, isAdmin, testConteroller);

export default router;