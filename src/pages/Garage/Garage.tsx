import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCars, setPage } from '../../store/garageSlice';
import CarForm from './CarForm/CarForm';
import RaceControls from './RaceControls/RaceControls';
import CarTrack from './CarTrack/CarTrack';
import Pagination from '../../components/Pagination/Pagination';
import WinnerBanner from '../../components/WinnerBanner/WinnerBanner';
import styles from './Garage.module.css';

const CARS_PER_PAGE = 7;

const Garage = () => {
  const dispatch = useAppDispatch();
  const { cars, totalCount, currentPage, loading, winnerId } = useAppSelector((s) => s.garage);

  useEffect(() => {
    dispatch(fetchCars(currentPage));
  }, [dispatch, currentPage]);

  const handlePage = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className={styles.garage}>
      <h1 className={styles.title}>Garage ({totalCount})</h1>

      <CarForm />
      <RaceControls />

      <div className={styles.carList}>
        {loading && <p className={styles.loading}>Loading...</p>}

        {!loading && cars.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🚗</span>
            <p>No cars in the garage yet. Create one above!</p>
          </div>
        )}

        {cars.map((car) => (
          <CarTrack key={car.id} car={car} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        perPage={CARS_PER_PAGE}
        onPage={handlePage}
      />

      {winnerId !== null && <WinnerBanner />}
    </div>
  );
};

export default Garage;
