import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../database';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

// Función asíncrona para manejar el inicio de sesión
const login = async (req: Request, res: Response): Promise<void> => {
  const { nombre, password } = req.body;
 console.log(req.body) 
 let firstName = nombre
  try {
    const [results] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM usuarios WHERE nombre = ?',
      [firstName]
    );
      console.log(results)
    if (results.length === 0) {
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }
    console.log('hola')
    const user = results[0];
     const isPasswordValid = await bcrypt.compare(password, user.password);

     if (!isPasswordValid) {
       res.status(401).json({ message: 'Credenciales incorrectas' });
       return;
    }

    const token = jwt.sign({ userId: user.id_usuario }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user.id_usuario, nombre: user.nombre } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export { login };
