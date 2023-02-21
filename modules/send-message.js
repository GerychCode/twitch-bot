const WebSocketClient = require('websocket').client;

module.exports = sendMessage = (data) => {
    const client = new WebSocketClient();
    let password = `oauth:${data.token}`;
    client.on('connect', function(connection) {
    connection.sendUTF(`PASS ${password}`); 
    connection.sendUTF(`NICK ${data.name}`);
    
    connection.sendUTF(`PRIVMSG ${data.channel} : ${data.replica}`);
    connection.close();

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
})

client.connect('ws://irc-ws.chat.twitch.tv:80');
    
}