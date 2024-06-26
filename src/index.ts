import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes'; // Asegúrate de importar las rutas de notas
import { pool } from './database';
import morgan from 'morgan';

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes); // Asegúrate de agregar las rutas de notas
const checkDatabaseConnection = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('¡Conexión exitosa a la base de datos!');
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err);
    }
};

checkDatabaseConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
