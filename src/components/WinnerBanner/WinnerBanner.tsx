import { useAppDispatch, useAppSelector } from '../../store';
import { dismissWinner } from '../../store/garageSlice';
import styles from './WinnerBanner.module.css';

const WinnerBanner = () => {
  const dispatch = useAppDispatch();
  const { winnerId, winnerTime, cars } = useAppSelector((s) => s.garage);

  if (winnerId === null) return null;

  const winner = cars.find((c) => c.id === winnerId);
  const name = winner?.name ?? 'Unknown';
  const time = winnerTime !== null ? (winnerTime / 1000).toFixed(2) : '?';

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Race winner">
      <div className={styles.banner}>
        <div className={styles.trophy}>🏆</div>
        <h2 className={styles.title}>We have a winner!</h2>
        <p className={styles.name}>{name}</p>
        <p className={styles.time}>{time}s</p>
        <button className={styles.close} onClick={() => dispatch(dismissWinner())} type="button">
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerBanner;
