const fs = require('fs');

module.exports = class RandomData {
    constructor(file_name) {
        this.file = file_name;
        this.data = null;
    }
    async getData() {
        return fs.promises.readFile(`./${this.file}.txt`, 'utf8')
          .then((getting_data) => {
            this.data = getting_data.split('\n').map(line => line.replace(/\r/g, ''));
            return this;
        })
          .catch((err) => {
            throw new Error(`Error reading file: ${err.message}`);
        });
    }
    async getRandom_Item() {
        let rand = this.data.length > 1 ? Math.floor(Math.random() * (Math.floor(this.data.length - 1) - Math.ceil(0) + 1) + Math.ceil(0)) : 0;
        return this.data[rand];
    }
}
