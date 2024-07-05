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

    // Método para manejar el registro de un nuevo usuario
    async register({ firstName, lastName, password }: { firstName: string, lastName: string, password: string }): Promise<any> {
        // Verifica si el usuario ya está registrado
        const existingUser = await UserRepository.getUserByName(firstName);
        if (existingUser) {
            throw new Error('Usuario ya registrado');
        }

        // Hashea la contraseña proporcionada
        const hashedPassword = await bcrypt.hash(password, 10);
        // Agrega el nuevo usuario a la base de datos
        const user = await UserRepository.addUser({ nombre: firstName, apellido: lastName, password: hashedPassword });
        // Retorna la información del usuario y un mensaje de confirmación
        return { user, message: 'Usuario registrado correctamente' };
    }
}

// Exportamos una instancia de AuthService para ser usada en otras partes de la aplicación
export default new AuthService();
