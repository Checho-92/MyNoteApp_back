// src/routes/Routes.ts
import express from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import NoteController from '../controllers/NoteController';
import { authenticateToken } from '../middlewares/authMiddleware';

    const router = express.Router();

    // Rutas de autenticación
    router.post('/login', AuthController.login);

    // Rutas de registro de usuarios
    router.post('/register', UserController.register);

    // Rutas para la gestión de notas (protegidas)
    router.post('/notes', authenticateToken, NoteController.create); // Crear una nueva nota
    router.get('/notes/user/:userId', authenticateToken, NoteController.getByUserId); // Obtener todas las notas de un usuario por su ID
    router.put('/notes/:id', authenticateToken, NoteController.update); // Actualizar una nota por su ID
    router.delete('/notes/:id', authenticateToken, NoteController.delete); // Eliminar una nota por su ID
    router.put('/multiple', authenticateToken, NoteController.updateMultiple); // Actualizar múltiples notas
    router.delete('/multiple', authenticateToken, NoteController.deleteMultiple); // Eliminar múltiples notas


    


    export default router;
