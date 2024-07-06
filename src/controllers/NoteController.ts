// src/controllers/NoteController.ts
import { Request, Response } from 'express';
import NoteService from '../applications/services/NoteService';

// Clase NoteController que maneja las solicitudes HTTP relacionadas con las notas
class NoteController {
  // Método para manejar la creación de una nueva nota
  async create(req: Request, res: Response) {
    try {
      const { nombre, contenido, id_usuario, estado, fecha } = req.body;
      if (!nombre) {
        return res.status(400).json({ message: 'El título de la nota es obligatorio.' });
      }
      if (!contenido) {
        return res.status(400).json({ message: 'El contenido de la nota es obligatorio.' });
      }
      if (!id_usuario) {
        return res.status(400).json({ message: 'El ID del usuario es obligatorio.' });
      }
      if (!estado) {
        return res.status(400).json({ message: 'El estado de la nota es obligatorio.' });
      }
      if (!fecha) {
        return res.status(400).json({ message: 'La fecha de la nota es obligatoria.' });
      }

      const note = await NoteService.createNote(req.body); // Llama al servicio para crear la nota
      res.status(201).json(note); // Retorna la nota creada con un estado 201 (creado)
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
      const { id_nota, nombre, contenido, estado } = req.body;
      if (!id_nota) {
        return res.status(400).json({ message: 'El ID de la nota es obligatorio.' });
      }
      if (!nombre) {
        return res.status(400).json({ message: 'El título de la nota es obligatorio.' });
      }
      if (!contenido) {
        return res.status(400).json({ message: 'El contenido de la nota es obligatorio.' });
      }
      if (!estado) {
        return res.status(400).json({ message: 'El estado de la nota es obligatorio.' });
      }

      await NoteService.updateNote(req.body); // Llama al servicio para actualizar la nota
      res.status(200).json({ message: 'Nota actualizada exitosamente' }); // Retorna un mensaje de éxito
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: `Error al actualizar la nota: ${error.message}` }); // Retorna un error 500 si algo falla
      } else {
        res.status(500).json({ message: 'Error desconocido al actualizar la nota' });
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
