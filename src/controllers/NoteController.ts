// src/controllers/NoteController.ts
import { Request, Response } from 'express';
import NoteService from '../applications/services/NoteService';

// Clase NoteController que maneja las solicitudes HTTP relacionadas con las notas
class NoteController {
  // Método para manejar la creación de una nueva nota
  async create(req: Request, res: Response) {
    try {
      const note = await NoteService.createNote(req.body); // Llama al servicio para crear la nota
      res.status(201).json(note); // Retorna la nota creada con un estado 201 (creado)
    } catch (error) {
      res.status(500).json({ message: error.message }); // Retorna un error 500 si algo falla
    }
  }

  // Método para obtener todas las notas de un usuario por su ID
  async getByUserId(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId); // Obtiene el ID del usuario de los parámetros de la URL
      const notes = await NoteService.getNotesByUserId(userId); // Llama al servicio para obtener las notas
      res.status(200).json(notes); // Retorna las notas con un estado 200 (OK)
    } catch (error) {
      res.status(500).json({ message: error.message }); // Retorna un error 500 si algo falla
    }
  }

  // Método para actualizar una nota
  async update(req: Request, res: Response) {
    try {
      await NoteService.updateNote(req.body); // Llama al servicio para actualizar la nota
      res.status(200).json({ message: 'Note updated successfully' }); // Retorna un mensaje de éxito
    } catch (error) {
      res.status(500).json({ message: error.message }); // Retorna un error 500 si algo falla
    }
  }

  // Método para eliminar una nota por su ID
  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id); // Obtiene el ID de la nota de los parámetros de la URL
      await NoteService.deleteNoteById(id); // Llama al servicio para eliminar la nota
      res.status(200).json({ message: 'Note deleted successfully' }); // Retorna un mensaje de éxito
    } catch (error) {
      res.status(500).json({ message: error.message }); // Retorna un error 500 si algo falla
    }
  }
}

// Exportamos una instancia de NoteController para ser usada en las rutas
export default new NoteController();
