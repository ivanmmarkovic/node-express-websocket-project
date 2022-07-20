const express = require('express');
const app = express();
const ejs = require('ejs');
const WebSocket = require('ws');

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res, next) => {
    res.render('index', {title: "Home"});
});


const server = app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));

const wss = new WebSocket.Server({
    noServer: true
});

wss.on('connection', ws => {
    ws.send('You\'re connected');

    ws.on('message', data => {
        // ws.send(data.toString());
        wss.clients.forEach(client => {
            client.send(data.toString());
        });
    });
});

server.on('upgrade', function upgrade(request, socket, head) {
    // handle authentication
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });

});
