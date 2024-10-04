import express from 'express';
import alicia1PlayerRoutes from './routes/alicia_1/player';

const app = express();

app.use(express.json());
app.use('/alicia1/player', alicia1PlayerRoutes);

export default app;