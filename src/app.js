import express from "express";
import mainRoutes from './routes/main.routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
   res.setHeader('X-Powered-By', 'Picaboo');
   next();
})

app.use('/api',mainRoutes);

app.use((req, res, next) => {
   res.status(404).send({status:"Error",msg:"Bad request to the API"})
})
export default app;
