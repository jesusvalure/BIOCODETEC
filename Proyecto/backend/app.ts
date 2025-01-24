import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Importar rutas
import userRoutes from './routes/userRoutes.ts';

app.use('/api/users', userRoutes);

// Escuchar en un puerto específico
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
