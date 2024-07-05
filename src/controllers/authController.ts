import { Request, Response } from 'express';
import AuthService from '../applications/services/AuthService';

// Clase AuthController que maneja las solicitudes HTTP relacionadas con la autenticación
class AuthController {
    // Método para manejar las solicitudes de inicio de sesión
    async login(req: Request, res: Response) {
        try {
            const { nombre, password } = req.body;
            const user = await AuthService.login(nombre, password);
            res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ message: `Error al iniciar sesión: ${error.message}` });
            } else {
                res.status(401).json({ message: 'Error desconocido al iniciar sesión' });
            }
        }
    }
}

// Exportamos una instancia de AuthController para ser usada en las rutas
export default new AuthController();
