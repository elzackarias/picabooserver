import express from "express";
import indexRoutes from './routes/index.routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
   res.setHeader('X-Powered-By', 'Zackbyte');
   next();
})

app.use('/api',indexRoutes);

app.use((req, res, next) => {
   res.status(404).send({status:"Error",msg:"Bad request to the API"})
})
export default app;
