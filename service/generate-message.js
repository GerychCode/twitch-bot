"use strict"
require('dotenv').config()
const send_message = require('../modules/send-message.js');
const RandomData = require('../modules/get-random-data.js');

module.exports = class MSGenerator {
    constructor(data, client = null) {
        this.data = data;
        this.last_replic_list = [];
        this.interval = null;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    Start() {
        try {
            if(this.data?.msg_sender?.status && this.data?.msg_sender?.timer) {
                this.interval = setInterval(() => {
                    this.generateMessage();
                }, 1000 * this.data?.msg_sender?.timer);
            }
            if(this.data?.msg_bomber?.status && this.data?.msg_bomber?.text && this.data?.msg_bomber?.count && this.data?.msg_bomber?.timer) {
                this.messageBomber();
            }
            if(this.data?.msg_uppdate_login) {
                this.uppdateLogin();
            } 
            return this;
        }
        catch(e) {
            console.log(e);
        }
    }
    async generateMessage() {
        try {
            let unique_replicas = 5;
            const accounts = await new RandomData().getAccounts();
            const replica = await new RandomData().getReplicas();

            let random_accounts = await accounts.getRandom_Item();
            let random_replic = await replica.getRandom_Item();
            if (!this.last_replic_list.includes(random_replic)) {
                if (this.last_replic_list.length >= unique_replicas) {
                    this.last_replic_list.shift();
                    this.last_replic_list.push(random_replic);
                }
                else this.last_replic_list.push(random_replic);
                send_message({
                    channel: `#${this.data?.channel}`,
                    name: random_accounts.login,
                    token: random_accounts.token.replace(/\r/g, ''),
                    replica: random_replic
                });
            }
            else this.generateMessage();
        }
        catch(e) {
            console.log(e);
        }
    }
    stopGenerateMessage() {
        try {
            if(this.interval) {
                clearInterval(this.interval);
            }
            return this;
        } catch (error) {
            console.log(error);
        }
    }
    async messageBomber() {
        try {
            let count = 0;
            let interval = setInterval(async () => {
            const accounts = await new RandomData().getAccounts();
            if(count <= this.data?.msg_bomber?.count) {
                let random_accounts = await accounts.getRandom_Item();
                send_message({
                    channel: `#${this.data?.channel}`,
                    name: random_accounts.login,
                    token: random_accounts.token.replace(/\r/g, ''),
                    replica: this.data?.msg_bomber?.text
                })
                count++;
            }    
            else clearInterval(interval);
            }, 1000 * this.data?.msg_bomber?.timer);
        } catch (error) {
            console.log(error);
        }
    }
    async uppdateLogin() {
        try {
            let count = 0;
            const accounts = await new RandomData().getAccounts();
            const replica = await new RandomData().getReplicas();
            let interval = setInterval(async () => {
            if(count <= accounts.data.length) {
                let random_accounts = await accounts.getRandom_Item();
                let random_replic = await replica.getRandom_Item();
                send_message({
                    channel: `#${this.data?.channel}`,
                    name: random_accounts.login,
                    token: random_accounts.token.replace(/\r/g, ''),
                    replica: random_replic
                })
                count++;
            }    
            else clearInterval(interval);
            }, 1000 * this.data?.msg_bomber?.timer);
        }
        catch(e) {
            console.log(e);
        }
    }
}