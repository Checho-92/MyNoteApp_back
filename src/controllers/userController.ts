import { Request, Response } from 'express';
import { addUser, getUserByName, updateUser, deleteUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { pool } from '../database';

// Función asíncrona para registrar un nuevo usuario
const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, password, confirmPassword } = req.body;

    // Verificación de que las contraseñas coincidan
    if (password !== confirmPassword) {
        res.status(400).json({ message: 'La contraseña y la confirmación de la contraseña no coinciden' });
        return;
    }

    try {
        const existingUser = await getUserByName(firstName);

        // Verificación si el usuario ya está registrado
        if (existingUser && existingUser.length > 0) {
            res.status(500).json({ message: 'Usuario ya registrado' });
            return;
        }

        // Creación del objeto usuario con los datos proporcionados
        const user = {
            nombre: firstName,
            apellido: lastName,
            password
        };

        const result = await addUser(user);
        
        // Obtener el ID del nuevo usuario insertado
        const userId = result.insertId;
        
        // // Insertar en la tabla `clientes`
        // await pool.query('INSERT INTO clientes (id_cliente, nombre) VALUES (?, ?)', [userId, firstName]);
        
        // // Insertar en la tabla `permisos`
        // await pool.query('INSERT INTO permisos (id_usuario, permiso) VALUES (?, ?)', [userId, 'add_to_cart']);

        // Generar token JWT para el nuevo usuario
        const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });

        // Respuesta con estado 201 (creado), token generado y datos del usuario
        res.status(201).json({ message: 'Usuario registrado correctamente', token, user: { id: userId, nombre: firstName } });
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Función asíncrona para actualizar la información del usuario
const updateUserInformation = async (req: Request, res: Response) => {
    const { id_usuario, nombre, password } = req.body;

    try {
        const updatedUser = await updateUser(id_usuario, { nombre, password });
        res.status(200).json({ message: 'Usuario actualizado correctamente', updatedUser });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Función asíncrona para eliminar la cuenta de un usuario
const deleteUserAccount = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await deleteUser(parseInt(id));
        res.status(200).json({ message: 'Cuenta eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export { registerUser, updateUserInformation, deleteUserAccount };
