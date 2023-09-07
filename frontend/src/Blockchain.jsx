import Block from './Block';
import styles from './App.module.css';

const Blockchain = ({ blocks, addBlock }) => {
  return (
    <>
      <form onSubmit={addBlock}>
        <div className={styles['form-controls']}>
          <input type='text' name='data' required />
          <button className={styles.btn}>Add Task to Blockchain</button>
        </div>
      </form>
      <ul>
        {blocks.slice().reverse().map((block) => (
          <Block key={block.index} block={block.data} />
        ))}
      </ul>
    </>
  );
};
export default Blockchain;