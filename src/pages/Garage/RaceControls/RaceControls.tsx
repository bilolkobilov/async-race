import { useAppDispatch, useAppSelector } from '../../../store';
import {
  startRace, resetRace, addRandomCars,
  startCarEngine, driveCarEngine, stopCarEngine,
} from '../../../store/garageSlice';
import styles from './RaceControls.module.css';

const RaceControls = () => {
  const dispatch = useAppDispatch();
  const { cars, raceStatus, currentPage } = useAppSelector((s) => s.garage);

  const handleRace = async () => {
    dispatch(startRace());
    const startResults = await Promise.all(cars.map((c) => dispatch(startCarEngine(c.id))));

    startResults.forEach((result, i) => {
      if (startCarEngine.fulfilled.match(result)) {
        const { velocity, distance } = result.payload;
        const time = Math.round(distance / velocity);
        dispatch(driveCarEngine({ id: cars[i].id, time }));
      }
    });
  };

  const handleReset = () => {
    dispatch(resetRace());
    cars.forEach((c) => {
      if (c.status !== 'idle') dispatch(stopCarEngine(c.id));
    });
  };

  const handleGenerate = async () => {
    await dispatch(addRandomCars(currentPage));
  };

  const isRacing = raceStatus === 'racing';

  return (
    <div className={styles.controls}>
      <button
        className={styles.btnRace}
        onClick={handleRace}
        disabled={isRacing || cars.length === 0}
        type="button"
      >
        Race
      </button>
      <button
        className={styles.btnReset}
        onClick={handleReset}
        disabled={raceStatus === 'idle'}
        type="button"
      >
        Reset
      </button>
      <button
        className={styles.btnGenerate}
        onClick={handleGenerate}
        disabled={isRacing}
        type="button"
      >
        Generate 100 Cars
      </button>
    </div>
  );
};

export default RaceControls;
