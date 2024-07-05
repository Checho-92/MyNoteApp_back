import express from 'express';
import AuthController from '../controllers/authController';
import UserController from '../controllers/UserController';

const router = express.Router();

// Rutas de autenticación
router.post('/login', AuthController.login);

// Rutas de registro de usuarios
router.post('/register', UserController.register);

export default router;
