"use strict"
require('dotenv').config();
const MSGenerator = require('./service/generate-message.js');
// setInterval(() => {
//     generate_message()
// }, interval);

const settings_data = {
    channel: "thekolkhoznik",
    msg_sender: {
        status: true,
        timer: 2
    },
    msg_bomber: {
        status: false ,
        text: "Сосать",
        count: 400,
        timer: 1
    }
}

let a = new MSGenerator(settings_data).Start()

