import express = require('express');
const app = express()
const port = 3000

app.get('/', (req: any, res: any) => {
    res.sendFile(__dirname + '/src/index.html')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
