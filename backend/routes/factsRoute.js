import express from 'express';
import { Fact } from '../models/factModel.js'


const router = express.Router();

router.post('/', async (request, response) => {
    try {

        if (!request.body.title || 
            !request.body.text || 
            !request.body.category ||
            !request.body.image ||
            !request.body.source
        ) 

        {
            return response.status(400).send({
                message: 'Send all required fields: title, text, category, image, source'
            });
        }

        const newFact = {
            title: request.body.title,
            text: request.body.text,
            category: request.body.category,
            source: request.body.source,
            image: request.body.image
        }

        // создаем факт по модели для добавления в базу данных
        const fact = await Fact.create(newFact);

        return response.status(201).send(fact)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
})

// get all facts
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id',async (request, response) => {
    try {
        if (
            !request.body.title || 
            !request.body.text || 
            !request.body.category ||
            !request.body.image ||
            !request.body.source
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, text, category, image, source'
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
router.delete('/:id', async(request, response) => {
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

export default router;