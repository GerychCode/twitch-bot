"use strict"
const interval = 1000;
const axios = require('axios');
const send_message = require('./modules/send-message.js');
const generate_nick = require('./modules/generate-name.js');
const RandomData = require('./modules/get-random-data.js');
const channel = '#thekolkhoznik';

const generate_message = async () => {
    let unique_replicas = 5;
    let last_replic_list = [];
    const tokens = await new RandomData("Tokens").getData();
    const replica = await new RandomData("Replicas").getData();

    let nick = generate_nick(9);
    let random_token = await tokens.getRandom_Item();
    let random_replic = await replica.getRandom_Item();
    if (!last_replic_list.includes(random_replic)) {
        if (last_replic_list.length >= unique_replicas) {
            last_replic_list.shift();
            last_replic_list.push(random_replic);
        }
        else {
            last_replic_list.push(random_replic);
        }
        send_message({
            channel: channel,
            name: nick,
            token: random_token,
            replica: random_replic
        })
    }
    else return generate_message()
}

setInterval(() => {
    generate_message()
}, interval);

