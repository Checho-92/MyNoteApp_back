import { Request, Response } from 'express';
import UserService from '../applications/services/UserService';

// Clase UserController que maneja las solicitudes HTTP relacionadas con los usuarios
class UserController {
    // Método para manejar las solicitudes de registro de nuevos usuarios
    async register(req: Request, res: Response) {
        try {
            const { firstName, lastName, password, confirmPassword } = req.body;
            
            // Verificación de que la contraseña no esté vacía
            if (!password) {
                return res.status(400).json({ message: 'Por favor ingresa una contraseña' });
            }

            // Verificación de que las contraseñas coincidan
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Por favor confirma tu contraseña' });
            }

            const user = await UserService.register(firstName, lastName, password);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }
}

// Exportamos una instancia de UserController para ser usada en las rutas
export default new UserController();