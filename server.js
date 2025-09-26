port = 3000
const express = require('express')
const {join} = require("node:path");
const app = express()

app.use(express.static(join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})