"use strict"
require('dotenv').config();
const MSGenerator = require('./service/generate-message.js');
// setInterval(() => {
//     generate_message()
// }, interval);

const settings_data = {
    channel: "thekolkhoznik",
    msg_sender: {
        status: false,
        timer: 2
    },
    msg_bomber: {
        status: false ,
        text: "Сосать",
        count: 400,
        timer: 1
    },
    msg_uppdate_login: true
}
console.log();

let a = new MSGenerator(settings_data).Start()
