import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import factsRoute from './routes/factsRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware to handle CORS policy
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders:['Content-Type']
    })
);

app.get("/", (request, response) => {
    // console.log(request);
    return response.status(234).send("Welcome to Useful Facts Projects!")
});


app.use('/facts', factsRoute)


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error)
    })