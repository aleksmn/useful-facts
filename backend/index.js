import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Fact } from './models/factModel.js'

const app = express();

// Middleware for parsing request body
app.use(express.json());


app.get("/", (request, response) => {
    // console.log(request);
    return response.status(234).send("Welcome to Useful Facts Projects!")
});


app.post('/facts', async (request, response) => {
    try {
        if (!request.body.title || 
            !request.body.text || 
            !request.body.category
        ) 
        {
            return response.status(400).send({
                message: 'Send all required fields: title, text, category'
            });
        }

        const newFact = {
            title: request.body.title,
            text: request.body.text,
            category: request.body.category,
            source: request.body.source
        }
        // console.log(newFact)
        const fact = await Fact.create(newFact);

        return response.status(201).send(fact);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
})


// get all facts
app.get('/facts', async (request, response) => {
    try {
        const facts = await Fact.find({});
        return response.status(200).json({
            count: facts.length,
            data: facts
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get one fact by ID
app.get('/facts/:id', async (request, response) => {
    try {

        const { id } = request.params;
 
        const fact = await Fact.findById(id);
        return response.status(200).json(fact);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// update fact
app.put('/facts/:id',async (request, response) => {
    try {
        if (
            !request.body.title || 
            !request.body.text || 
            !request.body.category
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, text, category'
            });
        }
        const { id } = request.params;
        const result = await Fact.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Fact not found' })
        }

        return response.status(200).send({ message: 'Fact updated successfully' })

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



// Delete fact
app.delete('/facts/:id', async(request, response) => {
    try {
        const { id } = request.params;
        const result = await Fact.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Fact not found' });
        }

        return response.status(200).send({ message: 'Fact deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


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