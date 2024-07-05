//AuthService.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../../adapters/repositories/UserRepository';
import { User } from '../../domain/models/User';

// Clase AuthService que maneja la lógica de negocio relacionada con la autenticación
class AuthService {
    // Método para manejar el inicio de sesión
    async login(nombre: string, password: string): Promise<any> {
        // Busca al usuario por su nombre
        const user = await UserRepository.getUserByName(nombre);
        // Verifica si el usuario existe y si tiene una contraseña
        if (!user || !user.password) {
            throw new Error('Credenciales incorrectas');
        }

        // Compara la contraseña proporcionada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // Si la contraseña no es válida, lanza un error
        if (!isPasswordValid) {
            throw new Error('Credenciales incorrectas');
        }

        // Genera un token JWT con el ID del usuario, válido por 1 hora
        const token = jwt.sign({ userId: user.id_usuario }, 'your_secret_key', { expiresIn: '1h' });
        // Retorna el token y la información del usuario
        return { token, user: { id: user.id_usuario, nombre: user.nombre } };
    }
}

// Exportamos una instancia de AuthService para ser usada en otras partes de la aplicación
export default new AuthService();
