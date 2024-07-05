// src/routes/Routes.ts

import express from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import NoteController from '../controllers/NoteController';

const router = express.Router();

// Rutas de autenticación
router.post('/login', AuthController.login);

// Rutas de registro de usuarios
router.post('/register', UserController.register);

// Rutas para la gestión de notas
router.post('/notes', NoteController.create); // Crear una nueva nota
router.get('/notes/user/:userId', NoteController.getByUserId); // Obtener todas las notas de un usuario por su ID
router.put('/notes/:id', NoteController.update); // Actualizar una nota por su ID
router.delete('/notes/:id', NoteController.delete); // Eliminar una nota por su ID

export default router;
