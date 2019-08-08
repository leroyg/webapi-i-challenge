// implement your API here
const express = require('express');

// other files
const db = require('./data/db');


//global objects
const server = express();


//middleware
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h3>Hello from your GET call on Express</h3>');
})

//get all users
server.get('/api/users', (req, res) =>{
    db.find()
    .then(users =>{
        res.json(users);
    })
    .catch(error =>{
        res.status(500).json({
            error: error
        })
    })
})

// get users by specific ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then( data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

// POST new users
server.post('/db', (req, res) => {
    const newObj = req.body;

    db.insert(newObj)
        .then(newEntry => {
            if(newEntry){
                const { id } = newEntry;
                db.findById(id)
                    .then(data => {
                        res.status(200).json(data)
                    });
                }
                else {
                    res.status(404).json({
                        message:'Not a valid New User'
                    })
                }
            })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'Failed to create New User'
                })
            })
        })

        server.delete('/db/:id', (req, res) =>{
            const { id } = req.params;
            db.remove(id)
                .then(deleteDB => {
                    if(deleteDB) {
                        res.json(deleteDB);
                    }
                    res.status(404).json({
                        message:'Invalid ID'
                    })
                })
        })

        .catch(err => {
            res.status(500).json({
                err: err,
                message:'Failed to delete new DB'
            })
        })

server.listen(port=(4000), ()=>{
    console.log(`server is listening on port ${port}`);
});