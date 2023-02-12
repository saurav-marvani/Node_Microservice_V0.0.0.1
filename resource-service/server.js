import express from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import { expressjwt } from "express-jwt";
import jwksClient from 'jwks-rsa'



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(expressjwt({
  secret: jwksClient.expressJwtSecret({
    jwksUri: 'http://localhost:4000/.well-known/jwks.json',
    cache: true,
    rateLimit: true
  }),
  algorithms: ['RS256']
}).unless({ path: ['/'] })
)

app.get('/', async (req, res, next) => {
  res.send({ message: 'This is resource route 🐻' });
});

app.get('/protected', async (req, res, next) => {
  res.send({ message: 'THIS IS PROTECTED ROUTE 🐻' });
});

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
