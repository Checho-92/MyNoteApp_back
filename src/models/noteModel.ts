        import { pool } from '../database';
        import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

        interface Nota {
        id_nota?: number;
        nombre: string;
        fecha: number;
        estado: string;
        contenido: string;
        id_usuario?: number; // Añadir id_usuario
        }

        // Obtener todas las notas
        const getAllNotas = async (): Promise<Nota[]> => {
        const [rows]: [RowDataPacket[], any] = await pool.query('SELECT * FROM notas');
        return rows as Nota[];
        };

        // Obtener nota por ID
        const getNotaById = async (id: number): Promise<Nota | null> => {
        const [rows]: [RowDataPacket[], any] = await pool.query('SELECT * FROM notas WHERE id_nota = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0] as Nota;
            };

        // Agregar una nueva nota
        const addNota = async (nota: Nota): Promise<ResultSetHeader> => {
        const [result]: [ResultSetHeader, any] = await pool.query(
            'INSERT INTO notas (nombre, fecha, estado, contenido, id_usuario) VALUES (?, ?, ?, ?, ?)',
            [nota.nombre, nota.fecha, nota.estado, nota.contenido, nota.id_usuario]
        );
        return result;
        };

        // Actualizar una nota
        const updateNota = async (id: number, nota: Nota): Promise<boolean> => {
        const [result]: [ResultSetHeader, any] = await pool.query(
            'UPDATE notas SET nombre = ?, fecha = ?, estado = ?, contenido = ? WHERE id_nota = ?',
            [nota.nombre, nota.fecha, nota.estado, nota.contenido, id]
        );
        return result.affectedRows > 0;
        };

        // Eliminar una nota
        const deleteNota = async (id: number): Promise<boolean> => {
        const [result]: [ResultSetHeader, any] = await pool.query('DELETE FROM notas WHERE id_nota = ?', [id]);
            return result.affectedRows > 0;
            };

        export { getAllNotas, getNotaById, addNota, updateNota, deleteNota };
