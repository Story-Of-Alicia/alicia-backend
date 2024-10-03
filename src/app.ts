import express from 'express';
import playerRoutes from './routes/player';

const app = express();

app.use(express.json());
app.use('/player', playerRoutes);

export default app;