import express from 'express';
import deliveryRoutes from './routes/deliveries.routes';

const app = express();

app.use(express.json());
app.use('/deliveries', deliveryRoutes);

export default app;
