import express from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import JWT from 'jsonwebtoken';
import fs from 'fs';
import compression from 'compression';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.static('public'));


app.get('/login', async (req, res, next) => {
    // assuming login checks is done and then issue a JWT.
    try {
        const secret = fs.readFileSync('./certs/private.pem')
        const token = JWT.sign({}, secret, { expiresIn: '10min', algorithm: 'RS256' })
        res.send({ token });
    } catch (err) {
        createError.BadRequest(err);
    }
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

