//userRoutes.ts

import express from 'express';
import { login } from '../controllers/authController';
import { registerUser, } from '../controllers/UserController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
 // Nueva ruta para eliminar cuenta

export default router;
