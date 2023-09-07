const Block = require('./Block');
const hash = require('./hash');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  
  createGenesisBlock() {
    return new Block({
      index: 0,
      timestamp: Date.now(),
      data: 'Genesis was here',
      hash: '0',
      prevHash: '0'
    });
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  getPreviousHash() {
    const lastBlock = this.getLatestBlock();
    return lastBlock ? lastBlock.hash : null;
  }
  addBlock(data) {  
    this.checkIfEmptyBlock(data);

    const index = this.chain.length;
    const timestamp = Date.now();
    const prevHash = this.getPreviousHash();
    const block = new Block({ index, timestamp, data, prevHash });
    block.hash = hash(JSON.stringify(block));
    this.chain.push(block);
  }
  checkIfEmptyBlock(block) {
    if (
      block.data === undefined ||
      block.data === null ||
      Object.keys(block.data).length === 0) {
      console.log('Invalid block data.');
      alert('Invalid block data.');
      throw new Error("Block must contain data");
    } 
  } 
   isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== hash(JSON.stringify(currentBlock))) {
        return false;
      }
      if (currentBlock.prevHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
} 
module.exports = Blockchain;
