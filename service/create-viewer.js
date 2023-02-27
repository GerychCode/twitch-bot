const create_viewer = (proxy) => {
    const WebSocketClient = require('websocket').client;

    const client = new WebSocketClient({
        proxy: 'http://<адрес_прокси>:<порт_прокси>'
    });

    const channel = '#<channel>';
    const account = '<account>'; 
    const password = 'oauth:<your access token goes here>';

    const moveMessage = 'Get up and move, your body will thank you!';
    const defaultMoveInterval = 1000 * 60 * 1;
    let moveInterval = defaultMoveInterval;

    client.on('connectFailed', function(error) {
        console.log('Connect Error: ' + error.toString());
    });

    client.on('connect', function(connection) {
        console.log('WebSocket Client Connected');

        connection.sendUTF(`PASS ${password}`); 
        connection.sendUTF(`NICK ${account}`);

        
        connection.on('error', function(error) {
            console.log("Connection Error: " + error.toString());
        });
    });

    client.connect('ws://irc-ws.chat.twitch.tv:80');
}
module.exports = create_viewer;

