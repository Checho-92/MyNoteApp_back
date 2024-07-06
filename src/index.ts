// src/index.ts

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import router from './routes/Routes'; // Importamos las rutas
import { pool } from './insfractructure/database';

const app = express();

// Middleware para registrar el token JWT
app.use(morgan((tokens, req, res) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers['authorization']?.split(' ')[1];
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    token ? `Token: ${token}` : '',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
}));

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
