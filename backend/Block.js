const hash = require('./hash');

class Block {
  constructor({ index, timestamp, data, prevHash }) {
    this.index = index,
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    const dataString = JSON.stringify(this.data);
    const blockString = `${this.index}${this.timestamp}${dataString}${this.prevHash}`;
    return hash(blockString);
  }
}
module.exports = Block;