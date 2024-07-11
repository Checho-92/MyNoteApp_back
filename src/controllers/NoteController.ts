// src/controllers/NoteController.ts
import { Request, Response } from 'express';
import NoteService from '../applications/services/NoteService';
import { Note } from '../domain/models/Note';

// Clase NoteController que maneja las solicitudes HTTP relacionadas con las notas
class NoteController {
  // Método para manejar la creación de una nueva nota
  async create(req: Request, res: Response) {
    try {
      const { nombre, contenido, id_usuario } = req.body;
      if (!nombre || !contenido || !id_usuario) {
        return res.status(400).json({ message: 'Nombre, contenido y id_usuario son obligatorios.' });
      }

      const note: Partial<Note> = {
        nombre,
        contenido,
        id_usuario,
        estado: req.body.estado || 'Pendiente',
        fecha: new Date(),
      };

      const createdNote = await NoteService.createNote(note as Note); // Llama al servicio para crear la nota
      res.status(201).json(createdNote); // Retorna la nota creada con un estado 201 (creado)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: `Error al crear la nota: ${error.message}` }); // Retorna un error 500 si algo falla
      } else {
        res.status(500).json({ message: 'Error desconocido al crear la nota' });
      }
    }
  }

  // Método para obtener todas las notas de un usuario por su ID
  async getByUserId(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'El ID del usuario debe ser un número válido.' });
      }

      const notes = await NoteService.getNotesByUserId(userId); // Llama al servicio para obtener las notas
      res.status(200).json(notes); // Retorna las notas con un estado 200 (OK)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: `Error al obtener las notas del usuario: ${error.message}` }); // Retorna un error 500 si algo falla
      } else {
        res.status(500).json({ message: 'Error desconocido al obtener las notas del usuario' });
      }
    }
  }

  // Método para actualizar una nota
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, contenido, estado } = req.body;

      if (!id || !nombre || !contenido || !estado) {
        return res.status(400).json({ message: 'ID de nota, nombre, contenido y estado son obligatorios.' });
      }

      const note: Note = {
        id_nota: parseInt(id),
        nombre,
        contenido,
        estado,
        id_usuario: req.body.id_usuario,
        fecha: new Date(req.body.fecha),
      };

      await NoteService.updateNote(note); // Llama al servicio para actualizar la nota
      res.status(200).json({ message: 'Nota actualizada exitosamente' }); // Retorna un mensaje de éxito
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: `Error al actualizar la nota: ${error.message}` }); // Retorna un error 500 si algo falla
      } else {
        res.status(500).json({ message: 'Error desconocido al actualizar la nota' });
      }
    }
  }
  async updateMultiple(req: Request, res: Response) {
    try {
      const { noteIds, estado } = req.body;
      if (!noteIds || !Array.isArray(noteIds) || !estado) {
        return res.status(400).json({ message: 'IDs de notas y estado son obligatorios y deben ser un array.' });
      }

      await NoteService.updateNotes(noteIds, { estado });
      res.status(200).json({ message: 'Notas actualizadas exitosamente' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: `Error al actualizar las notas: ${error.message}` });
      } else {
        res.status(500).json({ message: 'Error desconocido al actualizar las notas' });
      }
    }
  }

  // Método para eliminar una nota por su ID
  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID de la nota debe ser un número válido.' });
      }

      await NoteService.deleteNoteById(id); // Llama al servicio para eliminar la nota
      res.status(200).json({ message: 'Nota eliminada exitosamente' }); // Retorna un mensaje de éxito
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: `Error al eliminar la nota: ${error.message}` }); // Retorna un error 500 si algo falla
      } else {
        res.status(500).json({ message: 'Error desconocido al eliminar la nota' });
      }
    }
  }

  
}


// Exportamos una instancia de NoteController para ser usada en las rutas
export default new NoteController();
