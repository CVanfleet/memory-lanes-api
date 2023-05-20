const mongo = require('../db/connect');

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
            $eventStartDate: '2/15/2020',
            $eventEndDate: '2/20/2020'
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

module.exports = {
    getEvents,
    createEvent,
}