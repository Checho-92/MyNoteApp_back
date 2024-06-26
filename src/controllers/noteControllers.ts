import { Request, Response } from 'express';
import { addNota, getAllNotas, getNotaById, updateNota, deleteNota } from '../models/noteModel';
import { RowDataPacket } from 'mysql2';
import { pool } from '../database';

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notas = await getAllNotas();
    res.json(notas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notas', error });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notaId = parseInt(id, 10); // Convertir id a número entero
    if (isNaN(notaId)) {
      return res.status(400).json({ message: 'ID de nota inválido' });
    }
    const nota = await getNotaById(notaId);
    if (nota) {
      res.json(nota);
    } else {
      res.status(404).json({ message: 'Nota no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la nota', error });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { nombre, fecha, estado, contenido } = req.body;
    const { userId } = req.user as { userId: number }; // Suponiendo que userId está presente en req.user después de autenticación
    const result = await addNota({ nombre, fecha, estado, contenido, id_usuario: userId });
    res.status(201).json({ message: 'Nota creada', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la nota', error });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notaId = parseInt(id, 10); // Convertir id a número entero
    if (isNaN(notaId)) {
      return res.status(400).json({ message: 'ID de nota inválido' });
    }
    const { nombre, fecha, estado, contenido } = req.body;
    const { userId } = req.user as { userId: number }; // Suponiendo que userId está presente en req.user después de autenticación
    const success = await updateNota(notaId, { nombre, fecha, estado, contenido, id_usuario: userId });
    if (success) {
      res.json({ message: 'Nota actualizada' });
    } else {
      res.status(404).json({ message: 'Nota no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la nota', error });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notaId = parseInt(id, 10); // Convertir id a número entero
    if (isNaN(notaId)) {
      return res.status(400).json({ message: 'ID de nota inválido' });
    }
    const success = await deleteNota(notaId);
    if (success) {
      res.json({ message: 'Nota eliminada' });
    } else {
      res.status(404).json({ message: 'Nota no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la nota', error });
  }
};

// Obtener todas las notas "En proceso"
export const getInProcessNotes = async (req: Request, res: Response) => {
  try {
    const [rows]: [RowDataPacket[], any] = await pool.query('SELECT * FROM notas WHERE estado = "En proceso"');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notas en proceso', error });
  }
};
