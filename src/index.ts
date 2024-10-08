import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import businessRoutes from './routes/business';

const app = express();
app.use(bodyParser.json());

app.use('/api', businessRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});