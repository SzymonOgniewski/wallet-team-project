import { MutatingDots } from 'react-loader-spinner';
import styles from './LoaderComponent.module.css';

const Loader = () => (
  <div className={styles.load}>
    <MutatingDots
      height="100"
      width="100"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);

export default Loader