const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html')
})

app.get('/akaash', (req, res) => {
    res.sendFile(__dirname + '/src/akaash.html')
})

app.get('/data.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile((__dirname + '/data.json'));
});

app.get('/cameron', (req, res) => {
    res.sendFile(__dirname + '/src/cameron.html')
})

app.get('/dillion', (req, res) =>{
    res.sendFile(__dirname + '/src/dillon.html')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
