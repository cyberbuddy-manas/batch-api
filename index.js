const express = require('express');
const app = express();

const batches = [
    {name: 'Batch-1', endpoint: '/batch/1'},
    {name: 'Batch-2', endpoint: '/batch/2'},
    {name: 'Batch-3', endpoint: '/batch/3'}
];

const batchInfo = [
    {
        id: 1,
        name: 'Batch-1',
        strength: 22,
        subjects: ['English, Hindi, Punjabi'],
        students: [
            {name: 'Rishabh', age: 22, gender: 'Male'},
            {name: 'Pallavi', age: 25, gender: 'Female'},
            {name: 'Dhruv', age: 22, gender: 'Male'}
        ]
    },
    {
        id: 2,
        name: 'Batch-2',
        strength: 45,
        subjects: ['English, Maths, Punjabi, Science'],
        students: [
            {name: 'Karan', age: 22, gender: 'Male'},
            {name: 'Ankit', age: 25, gender: 'Male'},
            {name: 'Rishav', age: 22, gender: 'Male'}
        ]
    },
    {
        id: 3,
        name: 'Batch-3',
        strength: 12,
        subjects: ['English, Punjabi, Science'],
        students: [
            {name: 'Sanvi', age: 22, gender: 'Female'},
            {name: 'Sanchi', age: 25, gender: 'Female'}
        ]
    }
];

app.get('/', (req, res) => {
    res.send({
        message: 'Hello Cyberbuddies!!',
        endpoints: {
            batches: '/batches'
        }
    });
});

app.get('/batches', (req, res) => {
    res.send(batches);
});

app.get('/batch/:id', (req, res) => {
    // res.send(req.params.id);
    
    // res.send(batchInfo[req.params.id - 1]);
    
    // ---Data of individual Batch using ID---
    const course = batchInfo.find(c => c.id === parseInt(req.params.id));

    // ---Sending response for invalid Request---
    if (!course) return res.status(404).send({status: 404, message: 'Not Found'});

    res.send(course);
});

app.post('/batches', (req, res) => {
    const length = batches.length + 1;

    const newBatch = {
        name: "Batch-" + length,
        endpoint: "/batch/" + length
    }

    const newInfo = {
        id: length,
        name: "Batch-" + length,
        strength: req.body.strength,
        subjects: req.body.subjects,
        students: req.body.students
    }

    batches.push(newBatch);
    batchInfo.push(newInfo);
    res.send(batches);
    console.log(req.body);
});

app.delete('/batch/:id', (req, res) => {
    // ---Data of individual Batch using ID---
    const course = batchInfo.find(c => c.id === parseInt(req.params.id));

    // ---Sending response for invalid Request---
    if (!course) return res.status(404).send({status: 404, message: 'Not Found'});

    // ---Deleting the Batch---
    const index = batchInfo.indexOf(course);
    batchInfo.splice(index, 1);
    batches.splice(index, 1);

    // ---Sending the response---
    res.send(batches);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Listening to the PORT ${PORT}`));