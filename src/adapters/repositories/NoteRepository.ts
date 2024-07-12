// src/adapters/repositories/NoteRepository.ts
import { pool } from '../../insfractructure/database';
import { Note } from '../../domain/models/Note';

// Clase NoteRepository que maneja las operaciones de base de datos relacionadas con las notas
class NoteRepository {
  // Método para agregar una nueva nota a la base de datos
  async addNote(note: Partial<Note>): Promise<Note> {
    const [result] = await pool.query(
      'INSERT INTO notas (id_usuario, nombre, fecha, estado, contenido) VALUES (?, ?, ?, ?, ?)',
      [note.id_usuario, note.nombre, note.fecha, note.estado, note.contenido]
    );
    return { id_nota: (result as any).insertId, ...note } as Note; // Retorna la nota creada con su ID
  }

  // Método para obtener todas las notas de un usuario por su ID
  async getNotesByUserId(userId: number): Promise<Note[]> {
    const [rows] = await pool.query('SELECT * FROM notas WHERE id_usuario = ?', [userId]);
    return rows as Note[]; // Retorna las notas del usuario
  }

  // Método para actualizar una nota
  async updateNote(note: Note): Promise<void> {
    await pool.query(
      'UPDATE notas SET nombre = ?, estado = ?, contenido = ? WHERE id_nota = ?',
      [note.nombre, note.estado, note.contenido, note.id_nota]
    );
  }
  // Método para actualizar múltiples notas
  async updateMultipleNotes (noteIds: number[], noteData: Partial<Note>): Promise<void> {
    const placeholders = noteIds.map(() => '?').join(',');
    const query = `UPDATE notas SET estado = ? WHERE id_nota IN (${placeholders})`;
    await pool.query(query, [noteData.estado, ...noteIds]);
  }


  // Método para eliminar una nota por su ID
  async deleteNoteById(id: number): Promise<void> {
    await pool.query('DELETE FROM notas WHERE id_nota = ?', [id]);
  }

   // Método para eliminar múltiples notas por sus IDs
   async deleteMultipleNotes(noteIds: number[]): Promise<void> {
    const placeholders = noteIds.map(() => '?').join(',');
    const query = `DELETE FROM notas WHERE id_nota IN (${placeholders})`;
    await pool.query(query, noteIds);
  }

}

// Exportamos una instancia de NoteRepository para ser usada en otras partes de la aplicación
export default new NoteRepository();
