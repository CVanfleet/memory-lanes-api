const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getEvents(req, res, next){
    // #swagger.tags = ['Events']
    // #swagger.summary = 'Get all events'
    // #swagger.description = 'This request gets all events in the database'
    try {
        const result = await mongo.getConnection().db('memory-lanes-db').collection('event').find();
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (error) {
        next(error);
    }
};

async function getEventById(req, res, next){

    // #swagger.tags = ['Events']
    // #swagger.summary = 'Get event by id'
    // #swagger.description = 'This request gets an individual event by id number'
    // #swagger.parameters['id'] = { description: 'Event id' }
    
    const eventId = new ObjectId(req.params.id);

    try {
        const result = await mongo.getConnection().db('memory-lanes-db').collection('event').find({_id: eventId});
        const list = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    } catch (error) {
        next(error);
    }
}

async function createEvent(req, res, next) {
    // #swagger.tags = ['Events']
    // #swagger.summary = 'Create an event'
    // #swagger.description = 'This request creates a new event'
     /* #swagger.parameters['event'] = { 
        in: 'body',
        description: 'Event object',
        required: true,
        schema: {
            $eventName: 'First Anniversary',
            $eventDescription: 'We went to St George and ...',
            $lat: 37.0965,
            $long: 113.5684,
            $eventStartDate: '2011-10-05T14:48:00.000Z',
            $eventEndDate: '2011-10-05T14:48:00.000Z'
        }
    } */
    const event = req.body;
    const collection = mongo.getConnection().db('memory-lanes-db').collection('event');

    try {
        const result = await collection.insertOne(event);
        res.send(result).status(201);
    } catch (error) {
        res.status(500).send("Error creating event: " + error);
    }
}

async function updateEvent(req, res, next){

    // #swagger.tags = ['Events']
    // #swagger.summary = 'Update event by Id'
    // #swagger.description = 'This is a request to update a given contact record'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Event ID.',
        required: true,
        type: 'string'
    } 
      #swagger.parameters['event'] = { 
        in: 'body',
        description: 'Event object',
        required: true,
        schema: {
            eventName: 'First Anniversary',
            eventDescription: 'We went to St George and ...',
            lat: 37.0965,
            long: 113.5684,
            eventStartDate: '2011-10-05T14:48:00.000Z',
            eventEndDate: '2011-10-05T14:48:00.000Z'
        }

     } */

    const eventId = new ObjectId(req.params.id);
    const collection = mongo.getConnection().db('memory-lanes-db').collection('event');

    try {
        const result = await collection.updateOne({_id: eventId}, {$set: req.body});
        res.send(result).status(204);
    } catch (error) {
        res.status(501).send("Error updating event: " + error);
    }
}

async function deleteEvent(req, res, next){
    // #swagger.tags = ['Events']
    // #swagger.summary = 'Deletes a given event'
    // #swagger.description = 'This request deletes a given event record'
    // #swagger.parameters['id'] = { description: 'Event id' }

    const eventId = new ObjectId(req.params.id);
    const collection = mongo.getConnection().db('memory-lanes-db').collection('event');

    try {
        const result = await collection.deleteOne({_id: eventId});
        res.status(200).send(`{"responseMessage": "Event record (${eventId}) was deleted successfully"}`);
    } catch (error) {
        res.status(502).send(`{"responseMessage": "Something went wrong when trying to delete event ${eventId}: ${error}"}`);
    }
}

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
}