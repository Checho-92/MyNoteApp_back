import bcrypt from 'bcrypt';
import UserRepository from '../../adapters/repositories/UserRepository';
import { User } from '../../domain/models/User';

// Clase UserService que maneja la lógica de negocio relacionada con los usuarios
class UserService {
    // Método para manejar el registro de un nuevo usuario
    async register(firstName: string, lastName: string, password: string): Promise<{ user: User, message: string }> {
        try {
            // Verificamos si el usuario ya está registrado
            const existingUser = await UserRepository.getUserByName(firstName);
            if (existingUser) {
                throw new Error('Usuario ya registrado');
            }

            // Verificación de que la contraseña cumple con los requisitos de seguridad
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error('La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número.');
            }

            // Hasheamos la contraseña proporcionada
            const hashedPassword = await bcrypt.hash(password, 10);

            // Agregamos el nuevo usuario a la base de datos
            const user = await UserRepository.addUser({ nombre: firstName, apellido: lastName, password: hashedPassword });

            // Retornamos la información del usuario y un mensaje de confirmación
            return { user, message: 'Usuario registrado correctamente' };
        } catch (error) {
            // Manejo de errores y lanzamiento de una excepción con un mensaje claro
            throw new Error(`Error al registrar el usuario: ${(error as Error).message}`);
        }
    }
}

// Exportamos una instancia de UserService para ser usada en otras partes de la aplicación
export default new UserService();
