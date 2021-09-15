const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '..', 'public');
const portNumber = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(portNumber, () => console.log('Server has started...'));
