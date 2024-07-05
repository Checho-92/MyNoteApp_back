import { pool } from '../../insfractructure/database';
import { User } from '../../domain/models/User';

// Clase UserRepository que maneja las operaciones de base de datos relacionadas con los usuarios
class UserRepository {
      // Método para agregar un nuevo usuario a la base de datos
  async addUser(user: Partial<User>): Promise<User> {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, password) VALUES (?, ?, ?)',
      [user.nombre, user.apellido, user.password]
    );
    
    if (!user.nombre || !user.apellido) {
      throw new Error('Nombre y apellido son requeridos');
    }

    return { 
      id_usuario: (result as any).insertId, 
      nombre: user.nombre, 
      apellido: user.apellido, 
      password: user.password 
    };
  }

  async getUserByName(nombre: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }
}

export default new UserRepository();
