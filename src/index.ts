import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { pool } from './database';
import morgan from 'morgan';

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/user', userRoutes);

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
