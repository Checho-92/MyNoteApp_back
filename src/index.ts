// src/index.ts

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/Routes'; // Importamos las rutas
import { pool } from './insfractructure/database';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', router); // Cambiado para incluir todas las rutas bajo /api

// Verifica la conexión a la base de datos
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
