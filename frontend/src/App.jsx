import { useState, useEffect } from 'react';
import styles from './App.module.css';
import Blockchain from './Blockchain';

function App() {
  const [blocks, setBlocks] = useState([]);
  const url = 'http://localhost:5000/api/1/blocks';

  const loadBlockchain = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Sorry, no fetch ');
      }
      const data = await response.json();
      console.log(data);
      setBlocks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/1/blocks')
      .then((response) => response.json())
      .then((data) => setBlocks(data));
  }, []);

  const addBlockToBlockchain = async (event) => {
    event.preventDefault();
    const data = event.target.data.value;
    const newBlock = { data };
    console.log(data);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlock),
      });
  
      if (!response.ok) {
        throw new Error('No blockchain for you');
      }
      console.log(response);
      loadBlockchain();
    } catch (error) {
      console.error(error);
  }
};
    return(
        <main>
        <article className={styles.container}>
          <h1>To Do List </h1>
          <div>
          <Blockchain blocks={blocks} addBlock={addBlockToBlockchain} />
          </div>
        </article>
      </main>
    )
  }
export default App;
