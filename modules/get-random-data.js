const { timeStamp } = require('console');
const fs = require('fs');
module.exports = class RandomData {
    constructor() {
        this.data = null;
    }
    async getReplicas() {
        return fs.promises.readFile(`./Replicas.txt`, 'utf8')
          .then((getting_data) => {
            this.data = getting_data.split('\n').map(line => line.replace(/\r/g, ''));
            return this;
        })
          .catch((err) => {
            throw new Error(`Error reading file: ${err.message}`);
        });
    }async getAccounts() {
        return fs.promises.readFile(`./Verification.json`, 'utf8')
          .then((getting_data) => {
            this.data = getting_data;
            return this;
        })
          .catch((err) => {
            throw new Error(`Error reading file: ${err.message}`);
        });
    }
    async getRandom_Item() {
        let rand;
        if(Array.isArray(this.data)) {
            rand = this.data.length > 1 ? Math.floor(Math.random() * (Math.floor(this.data.length - 1) - Math.ceil(0) + 1) + Math.ceil(0)) : 0;
            return this.data[rand];
        }
        else {
            rand =  JSON.parse(this.data).length > 1 ? Math.floor(Math.random() * (Math.floor(JSON.parse(this.data).length - 1) - Math.ceil(0) + 1) + Math.ceil(0)) : 0;
            return JSON.parse(this.data)[rand];
        }
    }
    async getAccountsByNumber(index = 1) {
        if(Array.isArray(this.data)) return this.data[index];
        else return JSON.parse(this.data)[index];
    }
}
