const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
    res.sendFile(__dirname + '/index.html')
);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));