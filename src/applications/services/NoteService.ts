// src/applications/services/NoteService.ts
import { Note } from '../../domain/models/Note';
import NoteRepository from '../../adapters/repositories/NoteRepository';

// Clase NoteService que maneja la lógica de negocio relacionada con las notas
class NoteService {
  // Método para crear una nueva nota
  async createNote(note: Note): Promise<Note> {
    note.fecha = new Date(); // Establece la fecha de creación
    const createdNote = await NoteRepository.addNote(note); // Llama al repositorio para guardar la nota
    return createdNote; // Retorna la nota creada
  }

  // Método para obtener todas las notas de un usuario por su ID
  async getNotesByUserId(userId: number): Promise<Note[]> {
    return await NoteRepository.getNotesByUserId(userId); // Llama al repositorio para obtener las notas
  }

  // Método para actualizar una nota
  async updateNote(note: Note): Promise<void> {
    await NoteRepository.updateNote(note); // Llama al repositorio para actualizar la nota
  }

  // Método para eliminar una nota por su ID
  async deleteNoteById(id: number): Promise<void> {
    await NoteRepository.deleteNoteById(id); // Llama al repositorio para eliminar la nota
  }
}

// Exportamos una instancia de NoteService para ser usada en otras partes de la aplicación
export default new NoteService();
