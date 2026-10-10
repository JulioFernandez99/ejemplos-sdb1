import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';


import { poolConnect, pool,sql } from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/ping', (req, res) => {
  res.status(200).json({data: { message: 'pong' }});
});

app.get('/estudiantes', async (req, res) => {
  try {
    await poolConnect; // eestablecemos la conexión al pool de conexiones
    // flujo
    // primero se establece una conexion a la pool de conexiones
    // luego se usa ese objeto pool para hacer la consulta a la base de datos

    const result = await pool.request().query('SELECT * FROM bases1.ejemplo.estudiante'); 
    res.status(200).json({ data: result.recordset });
  }
  catch (err) {
    console.error('SQL error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/estudiante', async (req, res) => {
  try {
    await poolConnect; // eestablecemos la conexión al pool de conexiones
    const id = req.query.id; // Obtener el ID del estudiante desde los parámetros de consulta

    const result = await pool.request()
      .input('id', sql.Int, id) // Usar un parámetro de entrada para evitar inyecciones SQL
      .query('SELECT * FROM bases1.ejemplo.estudiante WHERE id_estudiante = @id'); // Consulta parametrizada 

      res.status(200).json({ data: result.recordset });
  }
  catch (err) {
    console.error('SQL error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});






app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});

