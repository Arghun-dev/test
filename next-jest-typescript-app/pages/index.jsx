import styles from '../styles/Home.module.css'
import Todos from '../components/Todos/Todos';

const Home = () => {
  return (
    <div className={styles.container}>
      <Todos />
    </div>
  )
}

export default Home
