import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectForEdit, removeCar, startCarEngine, stopCarEngine, driveCarEngine } from '../../../store/garageSlice';
import { CarState } from '../../../store/garageSlice';
import CarSvg from '../../../components/CarSvg/CarSvg';
import FlagSvg from '../../../components/FlagSvg/FlagSvg';
import { useCarAnimation } from './useCarAnimation';
import styles from './CarTrack.module.css';

interface CarTrackProps {
  car: CarState;
}

const CarTrack = ({ car }: CarTrackProps) => {
  const dispatch = useAppDispatch();
  const { raceStatus, currentPage } = useAppSelector((s) => s.garage);
  const carRef = useRef<HTMLDivElement>(null);
  const [engineDuration, setEngineDuration] = useState(3000);

  useCarAnimation(car.status, engineDuration, carRef);

  const handleStart = async () => {
    const result = await dispatch(startCarEngine(car.id));
    if (startCarEngine.fulfilled.match(result)) {
      const { velocity, distance } = result.payload;
      const time = Math.round(distance / velocity);
      setEngineDuration(time);
      dispatch(driveCarEngine({ id: car.id, time }));
    }
  };

  const handleStop = async () => {
    await dispatch(stopCarEngine(car.id));
  };

  const handleEdit = () => dispatch(selectForEdit({ id: car.id, name: car.name, color: car.color }));

  const handleDelete = () => {
    const newPage = currentPage;
    dispatch(removeCar({ id: car.id, page: newPage }));
  };

  const isEngineRunning = car.status === 'driving' || car.status === 'started';
  const canStop = car.status !== 'idle';
  const isRacing = raceStatus === 'racing';

  return (
    <div className={styles.row}>
      <div className={styles.controls}>
        <button
          className={styles.btnSelect}
          onClick={handleEdit}
          disabled={isRacing}
          type="button"
          title="Edit"
        >
          Edit
        </button>
        <button
          className={styles.btnDelete}
          onClick={handleDelete}
          disabled={isRacing}
          type="button"
          title="Delete"
        >
          Del
        </button>
        <span className={styles.name}>{car.name}</span>
      </div>

      <div className={styles.track} data-track>
        <div className={styles.engineBtns}>
          <button
            className={styles.btnA}
            onClick={handleStart}
            disabled={isEngineRunning}
            type="button"
            title="Start engine"
          >
            A
          </button>
          <button
            className={styles.btnB}
            onClick={handleStop}
            disabled={!canStop}
            type="button"
            title="Stop engine"
          >
            B
          </button>
        </div>

        <div ref={carRef} className={styles.car}>
          {car.status === 'broken' && <span className={styles.broken}>💥</span>}
          <CarSvg color={car.color} />
        </div>

        <div className={styles.flag}>
          <FlagSvg />
        </div>
      </div>
    </div>
  );
};

export default CarTrack;
